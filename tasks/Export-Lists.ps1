# Make sure to run Connect-PnPOnline first
Get-PnPProvisioningTemplate -Handlers "Lists" -ListsToExtract "TechCategories", "Tech" -Out ./tasks/schemas/Lists.TechStacker.xml


Write-Host "Extracting Items"
Add-PnPDataRowsToProvisioningTemplate -path ./tasks/schemas/Lists.TechStacker.xml -List "TechCategories" -Query '<view></view>'
Add-PnPDataRowsToProvisioningTemplate -path ./tasks/schemas/Lists.TechStacker.xml -List "Tech" -Query '<view></view>'
