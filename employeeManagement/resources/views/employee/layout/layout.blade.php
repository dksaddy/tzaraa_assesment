<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('CSS/layout.css') }}">
</head>

<body>
    <nav>
        <ul class="nav-list">
            <li><a href="/">Home</a></li>
            <!-- This class pushes itself and everything after it to the right -->
            <li class="nav-right"><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            <li>
                <a href="{{ route('add') }}"
                    style="padding: 5px 10px; background-color: #3b85f6; color: white; border: none; border-radius: 4px; cursor: pointer">
                    Add Employee
                </a>
            </li>
        </ul>
    </nav>

    <div class="content-wrapper">
        @yield('content')
    </div>

    @stack('scripts')
</body>

</html>