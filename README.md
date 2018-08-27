# nutritionist
This project is forked from a mutual project of Liron Blum & me. 
This project is identical to the original project we developed together 
but contains additional information (screenshots, presentation & background ) 
which will be presented by me at Reversim Summit 2018 - https://summit2018.reversim.com/session/5b0d4dfc4b330d00147e3374

--------------------------------------------------------------------------------------

# Background
as will be presented at the Revesim Summit 2018 presentation: 




---------------------------------------------------------------------------------------

Activation: 
-----------
There are detailed activation instructions in each service Readme file.
Here I will elborate on activating and getting results from the service 'planner' 
since this is the service which activates the Genetic Algorithm.

1. Download / clone project
2. Build & run planner container  : 
        cd planner
       /planner $ scripts/run.sh build
       /planner $ scripts/run.sh up 
3. In order to make sure you did it all correctly go to the swaggerUI at this address: 
   http://localhost:9122/docs/#/ 
   
   screenshot of planner swaggerUI: 
   
   <img width="1440" alt="screen shot 2018-08-27 at 11 52 44" src="https://user-images.githubusercontent.com/19207742/44651064-015ec280-a9f1-11e8-803f-0da5000f63df.png">


For an example Activation - copy request from:
planner ->test->testData->request.json
and insert it to the swaggerUI. 
It should look like : 

<img width="1430" alt="screen shot 2018-08-27 at 13 57 03" src="https://user-images.githubusercontent.com/19207742/44656334-20fde700-aa01-11e8-9f57-6566888bb78b.png">


Then if everything works like expected your results should look like:

<img width="1397" alt="screen shot 2018-08-27 at 13 54 03" src="https://user-images.githubusercontent.com/19207742/44656215-bcdb2300-aa00-11e8-8ad1-464f865e0ca1.png">


