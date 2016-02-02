To start, click on the 'Deploy To Bluemix' button below.

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://hub.jazz.net/git/jojustin/ExpenseTracker)

1. Login with the IBM Bluemix Account credentials.
2. Enter a unique App name.
3. Choose the Organization and Space to which the app has to be deployed.
4. Click on "DEPLOY" button to deploy the application. 
	Note: See below steps for the details of the execution
5. On successful deployment, click on "VIEW YOUR APP" button to launch the app on a browser. 

To do before you run the application -

This application requires a cloudant database configuration to be set correctly.  Follow the below steps for the application to work rightly.

1. Open the ExpenseTracker bluemix application created by the 'Deploy To Bluemix' button click.
2. Open the Cloudant instance bound to the app. 
3. Create the database 'expense-tracker' in the cloudant instance.  
4. Open the "server/datasources.json" file and update the file. 
5. Update the host, password, url, username entries according to the cloudant instance that is bound to the app.  You can get this information by opening the app & clicking the show credentials link on the cloudant db service view in the dashboard of the app.
6. Save the file and redeploy the app.  To redeploy the app, go to the Devops Services project's Build & Deploy and Run the stage. 


REST API view - 
1. To check the rest API open the browser and go to the url http://<your app route>>/explorer

Client App running - 
1. To run the client, first update the REST API end points.  To do this, open the file, client/www/js/lb-services.js. 
2. Change the value of the urlBase to the correct url -  var urlBase = "http://<route>/api";
3. Save it and run 'ionic serve'