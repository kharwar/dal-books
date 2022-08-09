# Dal Books
DalBooks is basically a Book Barter System that uses various services that make it completely serverless. The application is build on ReactJS that is packaged into a container using Docker and deployed on Amazon Elastic Beanstalk. It uses AWS Cognito for authentication and user management in conjunction to Lambda exposed through API Gateway that is interacting with DynamoDB. Not only this, it also uses Amazon Comprehend to analyze sentiment of the feedbacks provided by the user on each book.

You can find the deployed application [here](http://dalbooksfinal20-env.eba-xdwkz6ih.us-east-1.elasticbeanstalk.com/).

## Core Team
 1. Ridham Kathiriya
 2. Siddharth Kharwar
 3. Tasnim Khan

## Architecture Diagram
![image](https://user-images.githubusercontent.com/69080409/183542069-0eba388d-e517-4f15-abf6-c7c11b144c19.png)


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.
