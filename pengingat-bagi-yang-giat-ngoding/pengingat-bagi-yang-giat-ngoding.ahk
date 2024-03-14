#Requires AutoHotkey v2.0
#SingleInstance Force
#Warn

MainGui := Gui(,"Pengingat Bagi Yang Giat Ngoding",)
MainGui.SetFont("S16", "Calibri")
MainGui.Add("Text",,"Pengingat apa ini Bang/Neng?")
AlarmName := MainGui.AddEdit("r1 w300", "Buka Puasa")
MainGui.Add("Text",,"Kapan mau diingatkan Bang/Neng?")
Remindertime := MainGui.AddDateTime("vTimeForRemider w300", "Time")
MainGui.AddButton("x110", "Buat Pengingat").OnEvent('Click', SubmitClicked)
MainGui.Show("AutoSize")

SubmitClicked(*)
{
    If(A_Now > Remindertime.Value) {
	MsgBox "Salah tuh atur pengingatnya."
	} else {
	result := MsgBox("Pengingat diatur ke " FormatTime(Remindertime.Value, "HH:mm:ss") ", sekarang masih " FormatTime(A_Now,"HH:mm:ss"), "Siap Bang/Neng", "OK T3")
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
		MsgBox "Udah waktunya " AlarmName.Value " Bang/Neng"
		MainGui.Show("AutoSize")
	} Else {
	Exit
	}
}