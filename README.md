Projekt Library

1.	Aby zainicjalizować bazę danych wraz z zestawem danych proszę otworzyć plik library.sql
w programie sql server management studio, a następnie wykonać skrypt 
( należy zwrócić uwagę na to aby ścieżka była poprawna FILENAME = …  )
![image](https://user-images.githubusercontent.com/101005328/219758891-7a3c8aeb-1c62-42f8-9274-3c8619ea7ebe.png)

2.	Następnie należy otworzyć projekt oraz ustawić odpowiedni connection string 
![image](https://user-images.githubusercontent.com/101005328/219758874-6eb756d2-4904-439e-9c6c-5e797327c07a.png)

3.	Kolejnym krokiem będzie uruchomienie projektu  
![image](https://user-images.githubusercontent.com/101005328/219758847-aacbd3af-55ab-4f69-90c5-7b23565c9834.png)

•	Należy zwrócić szczególną uwagę na to aby backend uruchamiał się jako pierwszy
 ![image](https://user-images.githubusercontent.com/101005328/219758826-07a4e170-2539-492f-858b-a8ddb83ee0a5.png)

4.Po wykonaniu się pomyślniej kompilacji otworzą się nam dwie strony:

 •  swagger – dokumentacja wszystkich dostępnych endpointów w aplikacji
 
 ![image](https://user-images.githubusercontent.com/101005328/219758804-43d5ed37-8f52-46a3-9bd1-01dca5be4335.png)

 •	aplikacja frontowa

![image](https://user-images.githubusercontent.com/101005328/219758774-67642ed1-ea98-4f86-ae08-e150db86a755.png)

5. 5.	W aplikacji są dostępne dwa typu użytkowników (admin oraz user)
•	Admin – usuwanie, edycja książek oraz przeglądanie książek
 
 - email: admin@admin.pl hasło: test123
 
•	User – możliwość składania zamówień oraz przeglądania książek
 
 - email: testuser@user.pl hasło: test123
 ![image](https://user-images.githubusercontent.com/101005328/219804825-fa9fa0fe-191c-48b3-85f0-e6ef0a3f49ee.png)
 ![image](https://user-images.githubusercontent.com/101005328/219804838-d655e6e6-f691-41e4-a33c-9658494e62a9.png)
 ![image](https://user-images.githubusercontent.com/101005328/219805161-ddea98c1-34a5-4cfb-a27d-8df875337dac.png)
 ![image](https://user-images.githubusercontent.com/101005328/219805213-8ecc0959-cef4-4843-884a-7a4f30c74611.png)


Diagram bazy daynch:


![image](https://user-images.githubusercontent.com/101005328/219760658-b7e7fb7a-64de-40f4-a2af-a91d6cbd5a00.png)
