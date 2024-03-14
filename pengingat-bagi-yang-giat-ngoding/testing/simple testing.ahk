#Requires AutoHotkey v2.0
#warn
#SingleInstance Force
MainGui := Gui(,"Pengingat Sederhana",)
Remindertime := MainGui.AddDateTime("vTimeForRemider w300", "Time")
MainGui.AddButton("x110", "Buat Pengingat").OnEvent('Click', SubmitClicked)
MainGui.Show("AutoSize")

SubmitClicked(*) {
	MsgBox FormatTime(A_Now, "HHmmss")
	MsgBox FormatTime(Remindertime.Value, "HHmmss")
	MainGui.Hide()
	SetTimer TimeUp, 500
}

TimeUp() {
	if (A_Now = Remindertime.Value){
	MsgBox "TimeUp gans!"
	MainGui.Show("AutoSize")
	} else
	{
	Exit
	}
}
