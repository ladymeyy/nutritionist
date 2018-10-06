#!/usr/bin/env bash

microServices=(dbGateWay orchestrator planner)

for ms in ${!microServices[*]}
do
    docker-compose -f ${microServices[$ms]}/docker-compose.local.yml build
    printf "   %s\n" " ********* ${microServices[$ms]} is build ***********"
done
echo





