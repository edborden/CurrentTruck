#!/bin/sh
#!/bin/sh
#Created by Pinaki Sinha on 05/11/16
#This runs the pedestrain script for sim data.

a=0
maxVal=$1
while [ $a -lt 1000 ]
do
   echo $a
   node create-simulated-data.js ped $a 
   a=`expr $a + 1`
   sleep 1
done
