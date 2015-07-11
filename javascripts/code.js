Code = {
    render: function(root, text, language) {
        var pre = document.createElement('pre');
        var code = document.createElement('code');
        code.classList.add(language);
        code.innerHTML = text;
        pre.appendChild(code);
        root.appendChild(pre);
    }
};