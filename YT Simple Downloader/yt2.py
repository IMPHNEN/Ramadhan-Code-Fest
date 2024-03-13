import pytube
from pytube.cli import on_progress

#Credit by FRANKENSTEIN BLOODIE
#ini script gw buat kadang males download video di yt nya langsung + banyak yt downloader banyak iklannya dan mengganggu jadi mending buat sendiri yah meski kekurangannya video grafik diatas 720P gak ke download tapi not bad lah
#nah playlist juga bisa download jadi makin gacor
#kalo mau kembangkan minimal jangan hapus creditnya:D

def download_video(url):
    yt = pytube.YouTube(url, on_progress_callback=on_progress)
    ttp = yt.title
    streams = yt.streams.filter(progressive=True)
    available_formats = {str(i+1): stream for i, stream in enumerate(streams)}
    for num, stream in available_formats.items():
        print(f"{num}. {stream.resolution}")
        
    chosen_format = input("Pilih kualitas video yang ingin diunduh: ")
    selected_stream = available_formats[chosen_format]
    file_extension = selected_stream.mime_type.split("/")[-1]
    selected_stream.download(filename=ttp+"~"+chosen_format+"~.mp4")
    print("Download berhasil.\n filename: "+ttp+"~"+chosen_format+"~.mp4")

def download_audio(url):
    yt = pytube.YouTube(url, on_progress_callback=on_progress)
    ttp = yt.title
    stream = yt.streams.filter(only_audio=True).first()
    stream.download(filename=ttp+".mp3")
    print("Download berhasil.\n filename: "+ttp+".mp3")

def download_playlist_videos(url):
    playlist = pytube.Playlist(url)
    for video in playlist.videos:
        yt = pytube.YouTube(video.watch_url, on_progress_callback=on_progress)
        ttp = yt.title
        stream = yt.streams.get_highest_resolution()
        stream.download(filename=ttp+".mp4")
        print("Download berhasil.\n filename: "+ttp+".mp4")

def download_playlist_audios(url):
    playlist = pytube.Playlist(url)
    for video in playlist.videos:
        yt = pytube.YouTube(video.watch_url, on_progress_callback=on_progress)
        ttp = yt.title
        stream = yt.streams.filter(only_audio=True).first()
        stream.download(filename=ttp+".mp3")
        print("Download berhasil.\n filename: "+ttp+".mp3")

def main():
    url = input("Masukkan URL YouTube: ")
    choice = int(input("Pilih jenis download:\n1. Video\n2. Audio\n3. Video Playlist\n4. Audio Playlist\nPilihan: "))

    if choice == 1:
        download_video(url)
    elif choice == 2:
        download_audio(url)
    elif choice == 3:
        download_playlist_videos(url)
    elif choice == 4:
        download_playlist_audios(url)

if __name__ == "__main__":
    main()
