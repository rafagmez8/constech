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

// Sensibilidad del sensor en V/A
//float SENSIBILITY = 0.185;   // Modelo 5A
//float SENSIBILITY = 0.100; // Modelo 20A
//float SENSIBILITY = 0.066; // Modelo 30A
/*ls -ltr /dev/*usb*
screen /dev/tty.usbmodem14103*/



// WATIOS = AMPERIOS X VOLTIOS  -->  40W=AMPERIOS X 220V  -->  AMPERIOS = 40/220 = 0.18A
void getCurrents () {
    while(meditionDataThActive) {
        double r5, r20;
        double voltage5, voltage20;
        double amp5, amp20;
        double sumCurrent5 = 0;
        double sumCurrent20 = 0;
        double sumAllCurrent = 0;
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
            sumAllCurrent += amp5;
            sumCurrent20 += amp20;
            sumAllCurrent += amp20;
        }
        
        total5 = sumCurrent5/samplesNumber;
        total20 = sumCurrent20/samplesNumber;
        total = sumAllCurrent/samplesNumber;
        
        // Display values
        //printf("measure = (5V) %.2f V (20V) %.2f V = %.2f A\r\n", voltage5, voltage20, total);
        //printf("measure = (5V) %.2f V = %.2f A\r\n", voltage5, total5);
        //printf("measure = (20V) %.2f V = %.2f A\r\n", voltage20, total20);
        wait(3); // 3 second
        
        // QUEUE
        char *corchEntr = "[";
        //usb.printf("insert [ -- corchEntr=%s\r\n", corchEntr);
        queueMsg.put(corchEntr);
        itemInQueueMesg = true;
        wait(2);
        
        itemInQueueMesg=false;
        char valueT[8];
        sprintf(valueT, "%.2f", total);
        char *valueStringT = valueT;
        //usb.printf("insert valueT -- valueStringT=%s\r\n", valueStringT);
        queueMsg.put(valueStringT);
        itemInQueueMesg=true;
        wait(2);
        
        itemInQueueMesg=false;
        char *charSep = ":";
        //usb.printf("insert : -- charSep=%s\r\n", charSep);
        queueMsg.put(charSep);
        itemInQueueMesg=true;
        wait(2);
        
        itemInQueueMesg=false;
        char value5[8];
        sprintf(value5, "%.2f", total5);
        char *valueString5 = value5;
        //usb.printf("insert value5 -- valueString5=%s\r\n", valueString5);
        queueMsg.put(valueString5);
        itemInQueueMesg=true;
        wait(2);
        
        itemInQueueMesg=false;
        //usb.printf("insert : -- charSep=%s\r\n", charSep);
        queueMsg.put(charSep);
        itemInQueueMesg=true;
        wait(2);
        
        itemInQueueMesg=false;
        char value20[8];
        sprintf(value20, "%.2f", total20);
        char *valueString20 = value20;
        //usb.printf("insert value20 -- valueString20=%s\r\n", valueString20);
        queueMsg.put(valueString20);
        itemInQueueMesg=true;
        wait(2);
        
        itemInQueueMesg=false;
        char *corchExit = "]";
        //usb.printf("insert ] -- corchExit=%s\r\n", corchExit);
        queueMsg.put(corchExit);
        itemInQueueMesg=true;
        
        wait(1);
        itemInQueueMesg=false;
        wait(20);
    }
}



void reception () {
    while(receptionDataThActive) {
        if (itemInQueueMesg) {
            char *fin = "]";
            osEvent evento = queueMsg.get();
            
            if(evento.status == osEventMessage){
                char *item = (char*)evento.value.p;
                strcat(stringSendSerial, item);
                //printf("\nitem of queueMesg: %s || stringSendSerial: %s\r\n", item, stringSendSerial);
                
                if (strcmp(item, fin) == 0) {
                    //printf("Built data string...\r\n");
                    completeData = true;
                }
            }
        }
    }
}



void sendToSerial () {
    while(receptionDataThActive) {
        if (completeData) {
            completeData = false;
            usb.printf(stringSendSerial);
            memset(stringSendSerial, 0, 28);
            //printf("\r\nSe han mandado los datos y se ha vaciado el array\r\n\n");
        }
    }
}



int main() {
    //while(usb.readable() == 0) { wait(3); } //wait to serial available
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





/*¿Cómo puedo hacer que siempre esté escuchando el puerto serie? Cuando me llegue un carácter distinto dejo
de hacer lo que esté haciendo, vaya por donde vaya. ¿Uso break?*/


/* Se harían tareas para:
    - La lectura de los datos del sensor. (getCurrent())
    - El envío de los datos por el puerto serie. (sendDataToSerial())
    - El envío de información en tiempo real a la app cuando se solicite, además del histórico de mediciones.
        Se tendrán que usar interrupciones cuando la raspberry mande ciertos caracteres.
        Ver la posibilidad de usar varios hilos:
            * Uno para la comunicación normal con la raspberry.
            * Uno para la comunicación bajo demanda por parte de la app.*/

/*Otra idea sería crear un solo hilo para obtener y mandar los datos de los sensores pero controlado por un semáforo.
Como tenemos dos sensores, se pueden hacer las lecturas de dos formas:
    - Leer los dos sensores uno detrás de otro si el usuario no pide información en tiempo real.
    - Leer un sensor u otro dependiendo de la información que quiera ver el usuario.*/


/*Finalmente, los hilos a utilizar serán:
    - Medición de datos.
    - Recepción de datos.
    - Envío de datos por el puerto serie.
*/