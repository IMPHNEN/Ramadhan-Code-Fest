<!DOCTYPE html>
<html data-bs-theme="light" lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('assets/bootstrap/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="https://cdn.reflowhq.com/v2/toolkit.min.css">
     <link rel="stylesheet" href="{{ asset('assets/css/Navbar-Centered-Links-icons.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/styles.css') }}">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
 
</head>

<body>
    @livewireStyles
    @includeUnless($boolean, 'home.navbar')
    @yield('content')
    @includeUnless($boolean,'home.footer')
    @livewireScripts
</body>

<script src="{{ asset('assets/bootstrap/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('assets/js/scripts.js') }}"></script>
<script src="https://cdn.reflowhq.com/v2/toolkit.min.js"></script>
<script src="{{ asset('assets/js/bs-init.js') }}"></script>

<script>
    $('#myModal').modal('show'); 
</script>
