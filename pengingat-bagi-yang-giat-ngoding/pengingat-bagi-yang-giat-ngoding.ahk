#Requires AutoHotkey v2.0
#SingleInstance Force
#Warn

MainGui := Gui(,"Pengingat Sederhana",)
MainGui.SetFont("S12")
MainGui.Add("Text",,"Pengingat Sederhana untuk Bang/Neng yang Giat Ngoding")
Remindertime := MainGui.AddDateTime("vTimeForRemider", "Time")
FormatTime(Remindertime.Value, "Time")
MainGui.AddButton("Center", "Buat Pengingat").OnEvent('Click', SubmitClicked)
MainGui.Show("AutoSize")

SubmitClicked(*)
{
    result := MsgBox("Pengingat diatur ke " FormatTime(Remindertime.Value, "Time") " Sekarang masih " FormatTime(A_Now,"Time"), "Siap Bang/Neng", "OK T3")
        if (result = "OK" or "Timeout")
                {
                    If(DateAdd(A_Now, Remindertime.Value, "Minutes") <= 0) {
                        Sleep 10000
                    }
                    Else {
                        Traytip("Bang/Neng sudah waktunya bang!")
                        Sleep 3000
                        Traytip
                    }
                }
}