# COECheck 

## A tool for evaluating the maturity of an Azure practice

The COECheck tool was created to aid in the regular evaluation of Azure practices at solutions integrators around the world. It is a web application that when deployed to Azure will allow an evaluator to complete regular snapshots of a given practice's maturity level.

# Setup

## ARM Template
An ARM Template is provided to scaffold out all Azure resources necessary for setting up COECheck. 

The following resources will be deployed:
* App Service Plan
* Web App
* Storage Account
* DocumentDB Account

Note: The App Service Plan is configure to use a Basic app. Feel free to scale that down to Shared or Free after deployment.  If you attempt to deploy as a Shared or Free, you may run into an [issue](https://github.com/Azure/azure-sdk-for-node/issues/1740)

## Customization 