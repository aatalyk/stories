<div onmousemove="alert(1)">
  <p>onmousemove: <br> <span id="demo">Mouse over me!</span></p>
</div>
<a href="javascript:alert('XSS')">Click Me</a>

[Click Me](javascript:alert('Uh oh...'))

<img src="https://images.unsplash.com/the_good_boy.png" alt="The goodest boy" onload="alert(1)">
