@extends('home.main')

@section('title')
 Todolist   
@endsection

@section('content')


<div class="container">
@if (session('success'))
<div class="alert alert-success" role="alert">
      {{ session('success') }}  
</div>
@endif

@livewire('todolist')
        
</div>


@endsection
