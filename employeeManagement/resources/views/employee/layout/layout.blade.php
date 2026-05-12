<style>
    /* Navbar Container */
    body {
        margin: 0;
        padding: 0;
    }

    nav {
        background-color: #333;
        padding: 0 20px;
        height: 60px;
        display: flex;
        align-items: center;
    }

    /* The List */
    .nav-list {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        width: 100%;
        align-items: center;
    }

    /* Links Styling */
    .nav-list li a {
        color: white;
        text-decoration: none;
        padding: 10px 15px;
        display: block;
        font-family: sans-serif;
        transition: background 0.3s;
    }

    .nav-list li a:hover {
        background-color: #575757;
        border-radius: 4px;
    }

    /* The Magic Trick: Push Login/Register to the right */
    .nav-right {
        margin-left: auto;
    }
</style>

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