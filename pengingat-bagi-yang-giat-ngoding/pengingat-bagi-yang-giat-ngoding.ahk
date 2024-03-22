#Requires AutoHotkey v2.0
#SingleInstance Force
#Warn

MainGui := Gui(,"Pengingat Bagi Yang Giat Ngoding",)
MainGui.SetFont("s12", "Calibri")
MainGui.Add("Text",,"Pengingat apa ini Bang/Neng?")
AlarmName := MainGui.AddEdit("vNamingalarm r1 w300", "Buka Puasa")
MainGui.Add("Text",,"Kapan mau diingatkan Bang/Neng?")
Remindertime := MainGui.AddDateTime("vTimeForRemider w300", "Time")
global Discheck := MainGui.AddCheckbox("vDiscordcheckbox Checked0", "Mau diingetin di Discord juga?")
Discheck.OnEvent("Click", DiscordBotNotif)
MainGui.AddButton("x105", "Buat Pengingat").OnEvent("Click", SubmitClicked)
MainGui.SetFont("S6")
MainGui.AddLink("xs+80 y+10", 'Created by M. Ndaru Wibow - <a href="https://github.com/ndaruwibowo">GitHub Rep</a>')
MainGui.OnEvent("Close", Closeall)
MainGui.Show("AutoSize")

DiscordBotNotif(*)
{
	SubGui := Gui(,"Atur Discord Webhook Bot",)
	SubGui.SetFont("s12", "Calibri")
	SubGui.Add("Text",,"Discord Bot Webhook")
	global WebhookDiscord := SubGui.AddEdit("vWebhookfordiscord r1 w300", "")
	SubGui.AddButton("x130", "Oke").OnEvent("Click", SubGuisubmit)
	SubGui.OnEvent("Close", SubGuicancel)
	SubGui.Show()
	SubGuisubmit(*)
	{
		if (WebhookDiscord.Value = "") {
			MsgBox "Salah tuh atur webhooknya.", "Warning", "Icon!"
			return
		} else {
			SubGui.Hide()
		}
	}
	SubGuicancel(*)
	{
		Discheck.Value := 0
		SubGui.Hide()
	}
}


SubmitClicked(*)
{
    If(A_Now > Remindertime.Value) {
	MsgBox "Salah tuh atur pengingatnya.", "Warning", "Icon!"
	} else {
	result := MsgBox("Pengingat diatur ke " FormatTime(Remindertime.Value, "HH:mm:ss") ", sekarang masih " FormatTime(A_Now,"HH:mm:ss"), "Info", "OK T3 Iconi")
	MainGui.Hide
	if(result = "OK" or "Timeout"){
	SetTimer TimeUp, 500
		}
	}
}

TimeUp()
{
	If(A_Now = Remindertime.Value){
		SoundPlay "C:\Windows\Media\Alarm01.wav"
		MsgBox "Udah waktunya " AlarmName.Value " Bang/Neng", "Notice", "Iconi"
		MainGui.Show("AutoSize")
		if(Discheck = 1){
			whr := ComObject("WinHttp.WinHttpRequest.5.1")
			botmessagetesting := ' {"content": "Udah Waktunya ' AlarmName.Value '"} '
			whr.Open("POST", WebhookDiscord.Value, false)
			whr.SetRequestHeader("Content-Type", "application/json")
			whr.Send(botmessagetesting)
			; Using 'true' above and the call below allows the script to remain responsive.
		} else {
		Exit
		}
	} Else {
	Exit
	}
}

Closeall(*)
{
ExitApp
}