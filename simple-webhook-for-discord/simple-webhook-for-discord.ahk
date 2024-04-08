/*
Simple webhook for discord
Creator: ndaruwibowo / frostytropis
Github: https://github.com/ndaruwibowo/simple-webhook-for-discord
License: MIT
Description:
Sending message with optional random image thru discord bot webhook.
*/
#Requires AutoHotkey v2.0
#Warn
#SingleInstance Force


/*
Static variable. You only need to change replace_me value to use this script.
*/
global DiscordWebhookToken := "replace_me" ;  replace with your bot token
global Withrandquoteandimg := "0" ; your can replace with either 0 for No or 1 for Yes.



/*
End of user-replaceable script.
Below is the main script, do not edit if you do not familiar with AHK v2 scripting.
*/
; Input box for message
If(DiscordWebhookToken = "replace_me"){
    MsgBox("Please insert your Discord bot token into the script line 17", "Error: Token is not defined", "OK Iconx")
} else {
    IB := InputBox("Type your message", "Message to send",, "Hello world!")
    if(IB.Result = "Cancel"){
        ExitApp
    } Else {
    ; HTTP req to fetch random quotes
    qwot := ComObject("WinHttp.WinHttpRequest.5.1")
    qwot.Open("GET", "https://zenquotes.io/api/random")
    qwot.Send()
    qwot.WaitForResponse()
    quotes := Regexreplace(qwot.ResponseText, '\[ {"q":"|","a":"(.+)', '')
    authorquote := Regexreplace(qwot.ResponseText, '.+<footer>|(<\/footer>.+)', '')
    ; HTTP req to sent msg thru Discord bot
    dis := ComObject("WinHttp.WinHttpRequest.5.1")
    randimg := 'https://picsum.photos/id/' random(1, 999) '/500/150'
    discordbotmessagewithrandimg := '{"content": "' IB.value '", "embeds": [ { "image": { "url": "' randimg '"}, "title": "' quotes ' - ' authorquote '"}]}'
    discordbotmessagewithoutrandimg := '{"content": "' IB.value '"}'
    dis.Open("POST", DiscordWebhookToken, false)
    dis.SetRequestHeader("Content-Type", "application/json")
    if(Withrandquoteandimg = "" or "0"){
        dis.Send(discordbotmessagewithoutrandimg)
        global disstatus := dis.Status()
    } else {
        dis.Send(discordbotmessagewithrandimg)
        global disstatus := dis.Status()
    }
        if (disstatus = "400"){
            MsgBox("Message failed to send", "Error", "OK Iconx")
            ExitApp
        } else {
            ExitApp
        }
    }
}
