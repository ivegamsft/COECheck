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

An ARM Template is provided in the `_ARMTemplate` folder to scaffold out all Azure resources necessary for setting up COECheck. 

The following resources will be deployed:
* App Service Plan
* Web App
* Storage Account
* DocumentDB Account
* Application Insights

The template uses two parameters for deployment:

`appName` is a name that will be used across all of the resources. Suggested: "coecheck" or "contosocoecheck". Since this name needs to be globally unique, the parameter is consumed by a variable in the ARM Template that adds some random characters to the end.  Please feel free to adjust the variable's behavior in the template to tweak the naming scheme of the resources.

`aadClientId` is the Client ID from the previous Step 1 section. This will store the ID in an environmental variable, used by the application to establish authentication with your AzureAD Application.

Once deployed, add the web app's URL (for example `https://coecheckz3c.azurewebsites.net/`) to "Reply URL" list in your Azure AD Application configuration window.

> Note: The App Service Plan is configured to use a Basic app. Feel free to scale that down to Shared or Free after deployment.  If you attempt to deploy as a Shared or Free, you may run into an [issue](https://github.com/Azure/azure-sdk-for-node/issues/1740)


## Troubleshooting

1. The ARM Template failed upon deployment

    [Response]

2. The app did not deploy from github

    [Response]
