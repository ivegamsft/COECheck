> **Update:** Hello! As of 1 January 2017 this content is no longer being actively managed and updated. It is provided as-is and may contain information that has changed. Any Issues will be addressed on a best-effort basis. Please see [Azure.com](http://www.azure.com) for the latest guidance. Thank you for your understanding.

---

<img src="https://gsiazurecoe.visualstudio.com/_apis/public/build/definitions/78166623-1028-4630-b951-f6618d607f05/11/badge" />

# COECheck 

## A tool for evaluating the maturity of an Azure practice

The COECheck tool was created to aid in the regular evaluation of Azure practices at solutions integrators around the world. It is a web application that when deployed to Azure will allow an evaluator to complete regular snapshots of a given practice's maturity level.

![COECheck Screenshot](https://github.com/GSIAzureCOE/COECheck/raw/master/media/coecheck-screenshot-02.png)

# Setup

<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FGSIAzureCOE%2FCOECheck%2Fmaster%2F_ARMTemplate%2FCOECheck%2FTemplates%2Fazuredeploy.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png"/>
</a>
<a href="http://armviz.io/#/?load=https%3A%2F%2Fraw.githubusercontent.com%2FGSIAzureCOE%2FCOECheck%2Fmaster%2F_ARMTemplate%2FCOECheck%2FTemplates%2Fazuredeploy.json" target="_blank">
    <img src="http://armviz.io/visualizebutton.png"/>
</a>

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

    Re-deploy the ARM Template a second time to see if that clears up the issue. May times a re-deployment will correct any initial errors, and since deployments are idempotent future deployments will not duplicate or change existing resources.

2. The app did not deploy from github

    While the deployment wires up deployment between the Azure Web Application at this GitHub repository, there may be an issue with the initial deployment.  If this is the case, open your Azure Web App from the [Azure Portal](https://portal.azure.com) and in the settings blade, select "Deployment Source".  Then select "Sync" from the blade's top toolbar.  This will re-sync the repository and the Web App.

    In the future, if you wish to update to a newer version of COECheck, you can do this same operation.  Since the application is configured using enviromental variables, you can safely update application code without impacting specific configurations.

3. Error: "The reply address 'http://coecheckz3c.azurewebsites.net/' does not match the reply addresses configured for the application: 00000000-0000-0000-0000-000000000000."

    In the [Classic Portal](https://manage.azure.com) open up AzureAD -> Your Directory -> Applications -> Your Custom Application (from Step 1 above) and ensure that the Reply URL value under the Single Sign On Section includes the URL for your Azure Web App (ex. "https://coecheckz3c.azurewebsites.net"). You must register any URL that is used with AzureAD authentication. 

    > Tip: If you are developing locally, add `http://localhost:1337` to enable authentication
