import React from 'react'


    
    const airflowApi = async () => {
        try {
          const response = await fetch('http://192.168.2.127:8080/api/v1/dags/unlocking_Script/dagRuns');
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching data from Airflow', error);
          throw error;
        }
    }


export default airflowApi