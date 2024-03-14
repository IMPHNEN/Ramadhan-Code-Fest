#Requires AutoHotkey v2.0
#SingleInstance Force
#Warn

MainGui := Gui(,"Pengingat Bagi Yang Giat Ngoding",)
MainGui.SetFont("s12", "Calibri")
MainGui.Add("Text",,"Pengingat apa ini Bang/Neng?")
AlarmName := MainGui.AddEdit("r1 w300", "Buka Puasa")
MainGui.Add("Text",,"Kapan mau diingatkan Bang/Neng?")
Remindertime := MainGui.AddDateTime("vTimeForRemider w300", "Time")
MainGui.AddButton("x110", "Buat Pengingat").OnEvent('Click', SubmitClicked)
MainGui.OnEvent("Close", Closeall)
MainGui.Show("AutoSize")

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
	} Else {
	Exit
	}
}

Closeall(*)
{
ExitApp
}