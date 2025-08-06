const nav = [
    "<nav>",
    "    <div id=\"header\">",
    "        <ul>",
    "            <a href=\"/index.html\">",
    "                <li><img src=\"/Assets/Images/Logo.PNG\" alt=\"AV Home logo - TBD\" style=\"width: 130px;\"></li>",
    "            </a>",
    "            <a href=\"/General_Audio\">",
    "                <li>General Audio Tips</li>",
    "                <!-- Include thing like common types of feedbacks, some apps that can help, best practices -->",
    "            </a>",
    "            <a href=\"/General_Video\">",
    "                <li>General Video Tips</li>",
    "                <!-- Incldude things like video setting and what they do, camera guide by Chris  -->",
    "            </a>",
    "        </ul>",
    "    </div>",
    "</nav>"
].join('\n');

const navbar = document.getElementById("navbar");
navbar.innerHTML = nav;

// HTML PASTE
    // <div id="navbar">
    //     <!-- Placeholder for nav -->
    // </div>
    // <script src="/Navbar.js"></script>
