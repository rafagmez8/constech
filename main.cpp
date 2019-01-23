#include "mbed.h"
#include "rtos.h"
#include "Queue.h"


Serial usb(USBTX, USBRX);
AnalogIn analog_value5V(A1);
AnalogIn analog_value20V(A2);
int voltsSensor = 8;
Thread meditionDataTh;
Thread receptionDataTh;
Thread sendDataTh;
bool meditionDataThActive = false;
bool receptionDataThActive = false;
bool sendDataThActive = false;
bool itemInQueueMesg = false;
bool completeData = false;
Queue <char, 32> queueMsg;
char stringSendSerial[28]="";

// WATTS = AMPS X VOLTS  -->  40W=AMPS X 220V  -->  AMPS = 40/220 = 0.18A
// SENSOR SENSIBILITY (V/A)
//float sensibility = 0.185;   // Model 5A
//float sensibility = 0.100; // Model 20A
//float sensibility = 0.066; // Model 30A



// This function obtains the data measured by the ammeters.
void getCurrents () {
    while(meditionDataThActive) {
        double r5, r20;
        double voltage5, voltage20;
        double amp5, amp20;
        double sumCurrent5 = 0;
        double sumCurrent20 = 0;
        double total5, total20, total;
        int samplesNumber = 200;
        
        for (int i = 0; i < samplesNumber; i++){
            r5 = analog_value5V.read(); // Read the analog input value (value from 0.0 to 1.0 = full ADC conversion range)
            r20 = analog_value20V.read(); // Read the analog input value (value from 0.0 to 1.0 = full ADC conversion range)
            voltage5 = r5 * 3.3; // Converts value in the 0V-3.3V range. The ADC of ST-Nucleo works in 3.3V.
            voltage20 = r20 * 3.3; // Converts value in the 0V-3.3V range. The ADC of ST-Nucleo works in 3.3V.
            amp5 = abs((voltage5-1.65))/0.185; // 1.65V because the entry of ammeter is 3.3V.
            amp20 = abs((voltage20-1.65))/0.1; // 1.65V because the entry of ammeter is 3.3V.
            sumCurrent5 += amp5;
            sumCurrent20 += amp20;
        }
        
        total5 = sumCurrent5/samplesNumber;
        total20 = sumCurrent20/samplesNumber;
        
        // To erase the invalid values of the ammeters. Noise error -> 1%.
        if (total5 < 0.05) { total5 = 0.0; }
        if (total20 < 0.2) { total20 = 0.0; }
        
        total = total5 + total20;
        
        // Display values
        /*printf("measure = (5V) %.2f V (20V) %.2f V = %.2f A\r\n", voltage5, voltage20, total);
        printf("measure = (5V) %.2f V = %.2f A\r\n", voltage5, total5);
        printf("measure = (20V) %.2f V = %.2f A\r\n", voltage20, total20);*/
        wait(3); // 3 second
        
        // We build a message queue in which we enter the data. These data will be collected in the reception thread.
        char *corchEntr = "[";
        //usb.printf("insert [ -- corchEntr=%s\r\n", corchEntr);
        queueMsg.put(corchEntr); // We put a start character in the message queue
        itemInQueueMesg = true;
        wait(2);
        
        itemInQueueMesg=false;
        char valueT[8];
        sprintf(valueT, "%.2f", total);
        char *valueStringT = valueT;
        //usb.printf("insert valueT -- valueStringT=%s\r\n", valueStringT);
        queueMsg.put(valueStringT); // We put the total value of the ammeters in the message queue
        itemInQueueMesg=true;
        wait(2);
        
        itemInQueueMesg=false;
        char *charSep = ":";
        //usb.printf("insert : -- charSep=%s\r\n", charSep);
        queueMsg.put(charSep); // We put a separator character in the message queue
        itemInQueueMesg=true;
        wait(2);
        
        itemInQueueMesg=false;
        char value5[8];
        sprintf(value5, "%.2f", total5);
        char *valueString5 = value5;
        //usb.printf("insert value5 -- valueString5=%s\r\n", valueString5);
        queueMsg.put(valueString5); // We put the value measured by the 5V ammeter in the message queue
        itemInQueueMesg=true;
        wait(2);
        
        itemInQueueMesg=false;
        //usb.printf("insert : -- charSep=%s\r\n", charSep);
        queueMsg.put(charSep); // We put a separator character in the message queue
        itemInQueueMesg=true;
        wait(2);
        
        itemInQueueMesg=false;
        char value20[8];
        sprintf(value20, "%.2f", total20);
        char *valueString20 = value20;
        //usb.printf("insert value20 -- valueString20=%s\r\n", valueString20);
        queueMsg.put(valueString20);// We put the value measured by the 20V ammeter in the message queue
        itemInQueueMesg=true;
        wait(2);
        
        itemInQueueMesg=false;
        char *corchExit = "]";
        //usb.printf("insert ] -- corchExit=%s\r\n", corchExit);
        queueMsg.put(corchExit); // We put an end character in the message queue
        itemInQueueMesg=true;
        
        wait(1);
        itemInQueueMesg=false;
        wait(44); // Wait 44 seconds to make a measurement per minute
    }
}


// This function checks that the message queue contains all the data.
void reception () {
    while(receptionDataThActive) {
        if (itemInQueueMesg) {
            char *fin = "]";
            osEvent evento = queueMsg.get();
            
            if(evento.status == osEventMessage){
                char *item = (char*)evento.value.p;
                strcat(stringSendSerial, item);
                //printf("\nlast item of the queueMesg: %s || stringSendSerial: %s\r\n", item, stringSendSerial);
                
                if (strcmp(item, fin) == 0) {
                    //printf("Built data string...\r\n");
                    completeData = true;
                }
            }
        }
    }
}


// This function sends the data trougth the serial port
void sendToSerial () {
    while(sendDataThActive) {
        if (completeData) {
            completeData = false;
            usb.printf(stringSendSerial);
            memset(stringSendSerial, 0, 28);
            //printf("\r\nThe data has been sent through the serial port and the array has been emptied\r\n\n");
        }
    }
}


// This function is the main function, which starts the threads and their flags.
int main() {
    while(usb.readable() == 0) { wait(3); } //wait to serial available
    while(1) {
        if (!meditionDataThActive && !receptionDataThActive && !sendDataThActive) {
            meditionDataThActive = true;
            receptionDataThActive = true;
            sendDataThActive = true;
            meditionDataTh.start(getCurrents);
            receptionDataTh.start(reception);
            sendDataTh.start(sendToSerial);
        }
    }
}
