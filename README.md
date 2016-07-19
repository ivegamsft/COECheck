# COECheck 

## A tool for evaluating the maturity of an Azure practice

The COECheck tool was created to aid in the regular evaluation of Azure practices at solutions integrators around the world. It is a web application that when deployed to Azure will allow an evaluator to complete regular snapshots of a given practice's maturity level.

# Setup

## Step 1: Create an application in Azure AD

1. Sign in to the Azure management portal.
2. Click on Active Directory in the left hand nav.
3. Click the directory tenant where you wish to register the sample application.
4. Click the Applications tab.
5. In the drawer, click Add.
6. Click "Add an application my organization is developing".
7. Enter a friendly name for the application, for example "COECheck", select "Web Application and/or Web API", and click next.
8. For the sign-on URL, enter the base URL for the app, which is by default `https://localhost:1337`.
9. For the App ID URI, enter `https://<your_tenant_name>/COECheck`, replacing `<your_tenant_name>` with the name of your Azure AD tenant. Save the configuration.
10. Have the Client ID handy for the next step

## Step 2: Deploy ARM Template

An ARM Template is provided to scaffold out all Azure resources necessary for setting up COECheck. 

The following resources will be deployed:
* App Service Plan
* Web App
* Storage Account
* DocumentDB Account
* Application Insights

Note: The App Service Plan is configure to use a Basic app. Feel free to scale that down to Shared or Free after deployment.  If you attempt to deploy as a Shared or Free, you may run into an [issue](https://github.com/Azure/azure-sdk-for-node/issues/1740)

1. Use the Client ID from the first step as the parameter "`aadClientId`". This will store the ID in an environmentable variable, used by the application to establish authentication.
2. Once deployed, add the web app's URL (example `https://coecheckz3c.azurewebsites.net/`) to "Reply URL" list in your Azure AD Application configuration window.

## Step 3: Setup DocumentDB

The ARM Template only created the DocumentDB Account.  

TODO: Add script and instructions

## Customization 
