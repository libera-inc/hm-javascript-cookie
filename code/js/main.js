const manageUtmSourceCookie = () => {
    // クッキーを取得する関数
    const getCookie = (name) => {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
        return "";
    };

    // クッキーを設定する関数
    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
    };

    // URLのクエリパラメータを取得する関数
    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param) || "";
    };

    const utmSourceURL = getQueryParam("utm_source");
    const utmSourceCookie = getCookie("utm_source");

    // utm_sourceがURLに存在し、クッキーの値と異なる場合
    if (utmSourceURL && utmSourceURL !== utmSourceCookie) {
        setCookie("utm_source", utmSourceURL, 30);
    }

    // クッキーから最新の値を取得
    const finalUtmSource = getCookie("utm_source");

    // フォームの隠しフィールドにクッキー値を設定
    const utmSourceField = document.querySelector(".js-utm-source");

    if (utmSourceField && finalUtmSource) {
        utmSourceField.value = finalUtmSource;
    }
};

manageUtmSourceCookie();
