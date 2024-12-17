# Story: Renting a car

## Use Case 01

As a **system user**<br>
In order to **get an avaiable car** in a specific category<br>
Given a **car category** containing 3 different cars<br>
When I check if there's a **car avaiable**<br>
Then it should **choose randomly a car** from the category chosen

## Use Case 02

As a **system user**<br>
In order to **calculate the final renting price**<br>
Given a customer who wants to rent a car for 5 days<br>
And he is 50 years old
When he chooses a car category that costs $37.60 per day<br>
Then I must add the tax of his age which is 30% of the selected category's price<br>
Then the final formula will be `((price per day * tax) * number of days)`<br>
And the final result will be `((37.6 * 1.3) * 5) = 244.4`<br>
And the final price will be printed in BRL format

## Use Case 03

As a **system user**<br>
In order to register a renting transaction<br>
Given a registered customer who is 50 years old<br>
And a car model that costs $37.6 per day<br>
And a delivery date that is for 5 days behind<br>
And given an actual date 05/11/2020<br>
When I rent a car I should see the customer data<br>
And the car selected<br>
And the final price which will be R$244,40<br>
And DueDate which will be printed in brazillian portuguse format like "17 de Dezembro de 2024"