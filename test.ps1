
#Url;Doclib;Title;Othervalue
#/sites/mysite/Documents/Document.docx;Documents;New Title;New Othervalue
$CSVData = Import-CSV $filepath

Connect-PnPOnline https://yourtenant.sharepoint.com/sites/mysite -Interactive

$CSVData |foreach-object {
    $item=Get-PnPFile -Url $_.Url -AsListItem
    Set-PnPListItem -List $_.Doclib -Identity $item.Id -Values @{Title=$_.Title;Othervalue=$_.Othervalue}
}