@extends('Home.main')

@section('title')
    Login
@endsection

@php
    $boolean = true;
@endphp

<div class="container">
    <div class="row justify-content-center">
        <div class="col-lg-4">
            <div class="card" style="margin-top: 40%">
                <div class="card-header">
                    <h1 class="card-title">Login</h1>
                </div>
                <div class="card-body">
                    @if(Session::has('error'))
                        <div class="alert alert-danger" role="alert">
                            {{ Session::get('error') }}
                        </div>
                    @endif

                    @if(Session::has('success'))
                    <div class="alert alert-success" role="alert">
                        {{ Session::get('success') }}
                    </div>
                @endif
                    <form action="{{ route('login') }}" method="POST">
                        @csrf
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" name="email" class="form-control" id="email" placeholder="name@example.com" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" name="password" class="form-control" id="password" required>
                        </div>
                        <div class="mb-3">
                            <div class="d-grid mb-3">
                                <button class="btn btn-primary">Login</button>
                            </div>
                            <span>Don't have account <a wire:navigate href="{{ route('registerForm') }}">Clik here</a></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
