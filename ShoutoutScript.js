!function e(t, s, n) {
    function i(r, a) {
        if (!s[r]) {
            if (!t[r]) {
                var c = "function" == typeof require && require;
                if (!a && c)
                    return c(r, !0);
                if (o)
                    return o(r, !0);
                var l = new Error("Cannot find module '" + r + "'");
                throw l.code = "MODULE_NOT_FOUND",
                l
            }
            var u = s[r] = {
                exports: {}
            };
            t[r][0].call(u.exports, (function(e) {
                return i(t[r][1][e] || e)
            }
            ), u, u.exports, e, t, s, n)
        }
        return s[r].exports
    }
    for (var o = "function" == typeof require && require, r = 0; r < n.length; r++)
        i(n[r]);
    return i
}({
    1: [function(e, t, s) {
        var n = e("tmi.js")
          , i = e("node-fetch")
          , o = e("ws")
          , r = {
            global: {},
            users: {}
        };
        function a(e) {
            for (var t = "", s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = 0; n < e; n++)
                t += s.charAt(Math.floor(Math.random() * s.length));
            return t
        }
        var c = ""
          , l = ""
          , u = null
          , h = null
          , m = !0
          , d = 0
          , f = {
            isDebug: !1,
            chatModes: {},
            version: function() {
                return "1.1.11"
            },
            onError: function(e) {
                console.error("Error:", e)
            },
            onCommand: function(e, t, s, n, i) {
                f.isDebug && console.log("onCommand default handler")
            },
            onChat: function(e, t, s, n, i) {
                f.isDebug && console.log("onChat default handler")
            },
            onWhisper: function(e, t, s, n, i) {
                f.isDebug && console.log("onWhisper default handler")
            },
            onMessageDeleted: function(e, t) {
                f.isDebug && console.log("onMessageDeleted default handler")
            },
            onJoin: function(e, t, s) {
                f.isDebug && console.log("onJoin default handler")
            },
            onPart: function(e, t, s) {
                f.isDebug && console.log("onPart default handler")
            },
            onHosted: function(e, t, s, n) {
                f.isDebug && console.log("onHosted default handler")
            },
            onRaid: function(e, t, s) {
                f.isDebug && console.log("onRaid default handler")
            },
            onSub: function(e, t, s, n) {
                f.isDebug && console.log("onSub default handler")
            },
            onResub: function(e, t, s, n, i, o) {
                f.isDebug && console.log("onResub default handler")
            },
            onSubGift: function(e, t, s, n, i, o) {
                f.isDebug && console.log("onSubGift default handler")
            },
            onSubMysteryGift: function(e, t, s, n, i) {
                f.isDebug && console.log("onSubMysteryGift default handler")
            },
            onGiftSubContinue: function(e, t, s) {
                f.isDebug && console.log("onGiftSubContinue default handler")
            },
            onCheer: function(e, t, s, n, i) {
                f.isDebug && console.log("onCheer default handler")
            },
            onChatMode: function(e, t) {
                f.isDebug && console.log("onChatMode default handler")
            },
            onReward: function(e, t, s, n, i) {
                f.isDebug && console.log("onReward default handler")
            },
            onConnected: function(e, t, s) {},
            onReconnect: function(e) {},
            Say: function(e, t) {
                return !!h && (t || (t = c),
                h.say(t, e).catch(f.onError),
                !0)
            },
            Whisper: function(e, t) {
                return !!h && (h.whisper(t, e).catch(f.onError),
                !0)
            },
            DeleteMessage: function(e, t) {
                return !!h && (t || (t = c),
                h.deletemessage(t, e).catch(f.onError),
                !0)
            },
            GetClient: function() {
                return h
            },
            Init: function(e, t, s, u) {
                if (("string" == typeof (s = s || [e]) || s instanceof String) && (s = [s]),
                !Array.isArray(s))
                    throw new Error("Channels is not an array");
                f.isDebug = u,
                c = s[0];
                var p = {
                    options: {
                        debug: u
                    },
                    connection: {
                        reconnect: !0,
                        secure: !0
                    },
                    channels: s
                };
                t && (p.identity = {
                    username: e,
                    password: t
                },
                l = t),
                (h = new n.client(p)).on("roomstate", (function(e, t) {
                    try {
                        var s = e.replace("#", "");
                        f.chatModes[s] = f.chatModes[s] || {},
                        "emote-only"in t && (f.chatModes[s].emoteOnly = t["emote-only"]),
                        "followers-only"in t && (f.chatModes[s].followerOnly = t["followers-only"] >= 0),
                        "subs-only"in t && (f.chatModes[s].subOnly = t["subs-only"]),
                        "r9k"in t && (f.chatModes[s].r9kMode = t.r9k),
                        "slow"in t && (f.chatModes[s].slowMode = t.slow),
                        f.onChatMode(f.chatModes[s], s)
                    } catch (e) {
                        f.onError(e)
                    }
                }
                )),
                h.on("message", (function(t, s, n, i) {
                    try {
                        var o = s["display-name"] || s.username || e
                          , a = "#" + s.username === t
                          , c = s.mod
                          , l = s.badges && "0" === s.badges.founder
                          , u = l || s.badges && void 0 !== s.badges.subscriber || s.subscriber
                          , h = s.badges && "1" === s.badges.vip || !1
                          , m = "highlighted-message" === s["msg-id"]
                          , d = s["user-id"]
                          , p = s.id
                          , g = s["room-id"]
                          , _ = s.badges
                          , b = s.color
                          , y = s.emotes
                          , w = s.flags
                          , v = s["tmi-sent-ts"]
                          , C = s["emote-only"] || !1
                          , k = s["message-type"]
                          , S = s["custom-reward-id"] || null
                          , x = {
                            broadcaster: a,
                            mod: c,
                            founder: l,
                            subscriber: u || l,
                            vip: h,
                            highlighted: m,
                            customReward: !!S
                        }
                          , E = {
                            id: p,
                            channel: t.replace("#", ""),
                            roomId: g,
                            messageType: k,
                            messageEmotes: y,
                            isEmoteOnly: C,
                            userId: d,
                            username: s.username,
                            displayName: s["display-name"],
                            userColor: b,
                            userBadges: _,
                            userState: s,
                            customRewardId: S,
                            flags: w,
                            timestamp: v
                        };
                        if (i || "!" !== n[0])
                            "action" === k || "chat" === k ? f.onChat(o, n, x, i, E) : "whisper" === k && f.onWhisper(o, n, x, i, E);
                        else {
                            var T = n.split(/ (.*)/)
                              , N = T[0].slice(1).toLowerCase()
                              , D = T[1] || "";
                            E.sinceLastCommand = function(e, t) {
                                if (!e)
                                    return {
                                        any: null,
                                        user: null
                                    };
                                var s = new Date
                                  , n = {};
                                return r.global[e] ? n.any = s - r.global[e] : n.any = 0,
                                r.global[e] = s,
                                t ? (r.users[t] || (r.users[t] = {}),
                                r.users[t][e] ? n.user = s - r.users[t][e] : n.user = 0,
                                r.users[t][e] = s) : n.user = null,
                                n
                            }(N, d),
                            f.onCommand(o, N, D, x, E)
                        }
                    } catch (e) {
                        f.onError(e)
                    }
                }
                )),
                h.on("messagedeleted", (function(e, t, s, n) {
                    try {
                        var i = n["target-msg-id"]
                          , o = {
                            id: i,
                            roomId: n["room-id"],
                            username: t,
                            message: s
                        };
                        f.onMessageDeleted(i, o)
                    } catch (e) {
                        f.onError(e)
                    }
                }
                )),
                h.on("join", (function(e, t, s) {
                    var n = {
                        channel: e.replace("#", "")
                    };
                    f.onJoin(t, s, n)
                }
                )),
                h.on("part", (function(e, t, s) {
                    var n = {
                        channel: e.replace("#", "")
                    };
                    f.onPart(t, s, n)
                }
                )),
                h.on("hosted", (function(e, t, s, n) {
                    var i = {
                        channel: e.replace("#", "")
                    };
                    f.onHosted(t, s, n, i)
                }
                )),
                h.on("raided", (function(e, t, s) {
                    var n = {
                        channel: e.replace("#", "")
                    };
                    f.onRaid(t, s, n)
                }
                )),
                h.on("cheer", (function(e, t, s) {
                    var n = ~~t.bits
                      , i = t["room-id"]
                      , o = t["display-name"] || t.username || t.login
                      , r = t["user-id"]
                      , a = "#" + t.username === e
                      , c = t.mod
                      , l = t.badges && "0" === t.badges.founder
                      , u = {
                        broadcaster: a,
                        mod: c,
                        founder: l,
                        subscriber: l || t.badges && void 0 !== t.badges.subscriber || t.subscriber,
                        vip: t.badges && "1" === t.badges.vip || !1
                    }
                      , h = {
                        id: t.id,
                        channel: e.replace("#", ""),
                        roomId: i,
                        userId: r,
                        username: t.username,
                        userColor: t.color,
                        userBadges: t.badges,
                        userState: t,
                        displayName: t["display-name"],
                        messageEmotes: t.emotes,
                        subscriber: t.subscriber
                    };
                    f.onCheer(o, s, n, u, h)
                }
                )),
                h.on("subscription", (function(e, t, s, n, i) {
                    var o = {
                        id: i.id,
                        roomId: i["room-id"],
                        messageType: i["message-type"],
                        messageEmotes: i.emotes,
                        userId: i["user-id"],
                        username: i.login,
                        displayName: i["display-name"],
                        userColor: i.color,
                        userBadges: i.badges,
                        userState: i,
                        channel: e.replace("#", "")
                    };
                    f.onSub(t, n, s, o)
                }
                )),
                h.on("resub", (function(e, t, s, n, i, o) {
                    var r = ~~i["msg-param-cumulative-months"]
                      , a = {
                        id: i.id,
                        roomId: i["room-id"],
                        messageType: i["message-type"],
                        messageEmotes: i.emotes,
                        userId: i["user-id"],
                        username: i.login,
                        displayName: i["display-name"],
                        userColor: i.color,
                        userBadges: i.badges,
                        channel: e.replace("#", "")
                    };
                    f.onResub(t, n, s, r, o, a)
                }
                )),
                h.on("subgift", (function(e, t, s, n, i, o) {
                    var r = ~~o["msg-param-sender-count"]
                      , a = {
                        id: o.id,
                        roomId: o["room-id"],
                        messageType: o["message-type"],
                        messageEmotes: o.emotes,
                        userId: o["user-id"],
                        username: o.login,
                        displayName: o["display-name"],
                        userColor: o.color,
                        userBadges: o.badges,
                        userState: o,
                        recipientDisplayName: o["msg-param-recipient-display-name"],
                        recipientUsername: o["msg-param-recipient-user-name"],
                        recipientId: o["msg-param-recipient-id"],
                        channel: e.replace("#", "")
                    };
                    f.onSubGift(t, s, n, r, i, a)
                }
                )),
                h.on("submysterygift", (function(e, t, s, n, i) {
                    var o = ~~i["msg-param-sender-count"]
                      , r = {
                        id: i.id,
                        roomId: i["room-id"],
                        messageType: i["message-type"],
                        messageEmotes: i.emotes,
                        userId: i["user-id"],
                        username: i.login,
                        displayName: i["display-name"],
                        userColor: i.color,
                        userBadges: i.badges,
                        userState: i,
                        recipientDisplayName: i["msg-param-recipient-display-name"],
                        recipientUsername: i["msg-param-recipient-user-name"],
                        recipientId: i["msg-param-recipient-id"],
                        userMassGiftCount: ~~i["msg-param-mass-gift-count"],
                        channel: e.replace("#", "")
                    };
                    f.onSubMysteryGift(t, s, o, n, r)
                }
                )),
                h.on("giftpaidupgrade", (function(e, t, s, n) {
                    var i = {
                        id: n.id,
                        roomId: n["room-id"],
                        messageType: n["message-type"],
                        messageEmotes: n.emotes,
                        userId: n["user-id"],
                        username: n.login,
                        displayName: n["display-name"],
                        userColor: n.color,
                        userBadges: n.badges,
                        userState: n,
                        gifterUsername: n["msg-param-sender-login"],
                        gifterDisplayName: n["msg-param-sender-name"],
                        channel: e.replace("#", "")
                    };
                    f.onGiftSubContinue(t, s, i)
                }
                )),
                h.on("connected", (function(e, t) {
                    console.log("Connected:" + e + ":" + t),
                    f.onConnected(e, t, m),
                    m = !1
                }
                )),
                h.on("reconnect", (function() {
                    console.log("Reconnecting"),
                    d++,
                    f.onReconnect(d)
                }
                )),
                h.connect().catch(f.onError),
                t && async function e(t, s) {
                    let n;
                    s = s.replace("oauth:", "");
                    let r = await i("https://id.twitch.tv/oauth2/validate", {
                        headers: {
                            Authorization: "OAuth " + s
                        }
                    }).then(e=>e.json());
                    if (!r.client_id || !r.scopes.includes("channel:read:redemptions") || !r.scopes.includes("user:read:email"))
                        return void console.error("Invalid Password or Permission Scopes (channel:read:redemptions, user:read:email)");
                    let c, l = (await i("https://api.twitch.tv/helix/users?login=" + t, {
                        headers: {
                            "Client-ID": r.client_id,
                            Authorization: "Bearer " + s
                        }
                    }).then(e=>e.json())).data[0].id;
                    c = "undefined" != typeof window ? new WebSocket("wss://pubsub-edge.twitch.tv") : new o("wss://pubsub-edge.twitch.tv"),
                    c.onopen = function(e) {
                        c.send(JSON.stringify({
                            type: "PING"
                        })),
                        n = setInterval(()=>{
                            c.send(JSON.stringify({
                                type: "PING"
                            }))
                        }
                        , 6e4);
                        let t = {
                            type: "LISTEN",
                            nonce: a(15),
                            data: {
                                topics: ["channel-points-channel-v1." + l],
                                auth_token: s
                            }
                        };
                        c.send(JSON.stringify(t))
                    }
                    ,
                    c.onerror = function(e) {
                        console.error(e)
                    }
                    ,
                    c.onmessage = function(n) {
                        switch (message = JSON.parse(n.data),
                        message.type) {
                        case "RESPONSE":
                            "ERR_BADAUTH" === message.error && console.error("PubSub Authentication Failure");
                            break;
                        case "RECONNECT":
                            setTimeout(()=>{
                                e(t, s)
                            }
                            , 3e3);
                            break;
                        case "MESSAGE":
                            if (message.data.topic.startsWith("channel-points-channel")) {
                                let e = JSON.parse(message.data.message);
                                if ("reward-redeemed" === e.type) {
                                    let t = e.data.redemption;
                                    var i = t.reward
                                      , o = {
                                        id: i.id,
                                        channelId: i.channel_id,
                                        title: i.title,
                                        prompt: i.prompt,
                                        cost: i.cost,
                                        userInputRequired: i.is_user_input_required,
                                        subOnly: i.is_sub_only,
                                        image: {
                                            url1x: i.image ? i.image.url_1x : null,
                                            url2x: i.image ? i.image.url_2x : null,
                                            url4x: i.image ? i.image.url_4x : null
                                        },
                                        defaultImage: {
                                            url1x: i.default_image.url_1x,
                                            url2x: i.default_image.url_2x,
                                            url4x: i.default_image.url_4x
                                        },
                                        backgroundColor: i.background_color,
                                        enabled: i.is_enabled,
                                        paused: i.is_paused,
                                        inStock: i.is_in_stock,
                                        maxPerStream: {
                                            enabled: i.max_per_stream.is_enabled,
                                            maxPerStream: i.max_per_stream.max_per_stream
                                        },
                                        shouldRedemptionsSkipRequestQueue: i.should_redemptions_skip_request_queue,
                                        templateId: i.template_id,
                                        updatedForIndicatorAt: i.updated_for_indicator_at,
                                        maxPerUserPerStream: {
                                            enabled: i.max_per_user_per_stream.is_enabled,
                                            maxPerUserPerStream: i.max_per_user_per_stream.max_per_user_per_stream
                                        },
                                        globalCooldown: {
                                            enabled: i.global_cooldown.is_enabled,
                                            globalCooldownSeconds: i.global_cooldown.global_cooldown_seconds
                                        },
                                        redemptionsRedeemedCurrentStream: i.redemptions_redeemed_current_stream,
                                        cooldownExpiresAt: i.cooldown_expires_at
                                    }
                                      , r = {
                                        channelId: t.channel_id,
                                        reward: o,
                                        rewardFulfilled: "FULFILLED" === t.status,
                                        userId: t.user.id,
                                        username: t.user.login,
                                        displayName: t.user.display_name,
                                        customRewardId: t.id,
                                        timestamp: t.redeemed_at
                                    };
                                    f.onReward(t.user.display_name || t.user.login, t.reward.title, t.reward.cost, t.user_input || "", r)
                                }
                            }
                        }
                    }
                    ,
                    c.onclose = function() {
                        clearInterval(n),
                        setTimeout(()=>{
                            e(t, s)
                        }
                        , 3e3)
                    }
                }(c, t)
            },
            Disconnect: function() {
                h.disconnect().catch(f.onError)
            },
            GetChannelRewards: async function(e, t=!1) {
                if (l) {
                    if (!u) {
                        let t = await i("https://api.twitch.tv/helix/users?login=" + c, {
                            headers: {
                                "Client-ID": e,
                                Authorization: "Bearer " + l
                            }
                        }).then(e=>e.json());
                        u = t.data[0]
                    }
                    return (await i(`https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=${u.id}&only_manageable_rewards=${t}`, {
                        headers: {
                            "Client-ID": e,
                            Authorization: "Bearer " + l
                        }
                    }).then(e=>e.json())).data || []
                }
                return []
            },
            CreateChannelReward: async function(e, t) {
                if (l) {
                    if (!u) {
                        let t = await i("https://api.twitch.tv/helix/users?login=" + c, {
                            headers: {
                                "Client-ID": e,
                                Authorization: "Bearer " + l
                            }
                        }).then(e=>e.json());
                        u = t.data[0]
                    }
                    return (await i("https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=" + u.id, {
                        method: "POST",
                        headers: {
                            "Client-ID": e,
                            Authorization: "Bearer " + l,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(t)
                    }).then(e=>e.json())).data[0]
                }
                throw new Error("Missing Channel Password")
            },
            UpdateChannelReward: async function(e, t, s) {
                if (l) {
                    if (!u) {
                        let t = await i("https://api.twitch.tv/helix/users?login=" + c, {
                            headers: {
                                "Client-ID": e,
                                Authorization: "Bearer " + l
                            }
                        }).then(e=>e.json());
                        u = t.data[0]
                    }
                    return (await i(`https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=${u.id}&id=${t}`, {
                        method: "PATCH",
                        headers: {
                            "Client-ID": e,
                            Authorization: "Bearer " + l,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(s)
                    }).then(e=>e.json())).data[0]
                }
                throw new Error("Missing Channel Password")
            },
            DeleteChannelReward: async function(e, t) {
                if (l) {
                    if (!u) {
                        let t = await i("https://api.twitch.tv/helix/users?login=" + c, {
                            headers: {
                                "Client-ID": e,
                                Authorization: "Bearer " + l
                            }
                        }).then(e=>e.json());
                        u = t.data[0]
                    }
                    return await i(`https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=${u.id}&id=${t}`, {
                        method: "DELETE",
                        headers: {
                            "Client-ID": e,
                            Authorization: "Bearer " + l
                        }
                    }).then(e=>e.text())
                }
                throw new Error("Missing Channel Password")
            }
        };
        void 0 !== t && t.exports && (t.exports = f),
        "undefined" != typeof window && (window.ComfyJS = f,
        n = window.tmi)
    }
    , {
        "node-fetch": 2,
        "tmi.js": 4,
        ws: 3
    }],
    2: [function(e, t, s) {
        (function(e) {
            "use strict";
            e = function() {
                if ("undefined" != typeof self)
                    return self;
                if ("undefined" != typeof window)
                    return window;
                if (void 0 !== e)
                    return e;
                throw new Error("unable to locate global object")
            }();
            t.exports = s = e.fetch,
            e.fetch && (s.default = e.fetch.bind(e)),
            s.Headers = e.Headers,
            s.Request = e.Request,
            s.Response = e.Response
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {}],
    3: [function(e, t, s) {
        "use strict";
        t.exports = function() {
            throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")
        }
    }
    , {}],
    4: [function(e, t, s) {
        (function(t) {
            !function t(s, n, i) {
                function o(a, c) {
                    if (!n[a]) {
                        if (!s[a]) {
                            var l = "function" == typeof e && e;
                            if (!c && l)
                                return l(a, !0);
                            if (r)
                                return r(a, !0);
                            var u = new Error("Cannot find module '" + a + "'");
                            throw u.code = "MODULE_NOT_FOUND",
                            u
                        }
                        var h = n[a] = {
                            exports: {}
                        };
                        s[a][0].call(h.exports, (function(e) {
                            return o(s[a][1][e] || e)
                        }
                        ), h, h.exports, t, s, n, i)
                    }
                    return n[a].exports
                }
                for (var r = "function" == typeof e && e, a = 0; a < i.length; a++)
                    o(i[a]);
                return o
            }({
                1: [function(e, t, s) {
                    "use strict";
                    t.exports = {
                        client: e("./lib/client"),
                        Client: e("./lib/client")
                    }
                }
                , {
                    "./lib/client": 3
                }],
                2: [function(e, t, s) {
                    "use strict";
                    var n = e("request")
                      , i = e("./utils");
                    t.exports = function(e, t) {
                        var s = null === i.get(e.url, null) ? i.get(e.uri, null) : i.get(e.url, null);
                        if (i.isURL(s) || (s = "https://api.twitch.tv/kraken" + ("/" === s[0] ? s : "/" + s)),
                        i.isNode())
                            n(i.merge({
                                method: "GET",
                                json: !0
                            }, e, {
                                url: s
                            }), t);
                        else if (i.isExtension()) {
                            e = i.merge({
                                url: s,
                                method: "GET",
                                headers: {}
                            }, e);
                            var o = new XMLHttpRequest;
                            for (var r in o.open(e.method, e.url, !0),
                            e.headers)
                                o.setRequestHeader(r, e.headers[r]);
                            o.responseType = "json",
                            o.addEventListener("load", (function(e) {
                                4 == o.readyState && (200 != o.status ? t(o.status, null, null) : t(null, null, o.response))
                            }
                            )),
                            o.send()
                        } else {
                            var a = "jsonp_callback_" + Math.round(1e5 * Math.random());
                            window[a] = function(e) {
                                delete window[a],
                                document.body.removeChild(c),
                                t(null, null, e)
                            }
                            ;
                            var c = document.createElement("script");
                            c.src = s + (s.includes("?") ? "&" : "?") + "callback=" + a,
                            document.body.appendChild(c)
                        }
                    }
                }
                , {
                    "./utils": 10,
                    request: 11
                }],
                3: [function(e, s, n) {
                    (function(t) {
                        "use strict";
                        var n = e("./api")
                          , i = e("./commands")
                          , o = e("./events").EventEmitter
                          , r = e("./logger")
                          , a = e("./parser")
                          , c = e("./timer")
                          , l = e("./extra-utils")
                          , u = t.WebSocket || t.MozWebSocket || e("ws")
                          , h = e("./utils")
                          , m = function e(t) {
                            if (this instanceof e == 0)
                                return new e(t);
                            this.setMaxListeners(0),
                            this.opts = h.get(t, {}),
                            this.opts.channels = this.opts.channels || [],
                            this.opts.connection = this.opts.connection || {},
                            this.opts.identity = this.opts.identity || {},
                            this.opts.options = this.opts.options || {},
                            this.clientId = h.get(this.opts.options.clientId, null),
                            this.maxReconnectAttempts = h.get(this.opts.connection.maxReconnectAttempts, 1 / 0),
                            this.maxReconnectInterval = h.get(this.opts.connection.maxReconnectInterval, 3e4),
                            this.reconnect = h.get(this.opts.connection.reconnect, !1),
                            this.reconnectDecay = h.get(this.opts.connection.reconnectDecay, 1.5),
                            this.reconnectInterval = h.get(this.opts.connection.reconnectInterval, 1e3),
                            this.reconnecting = !1,
                            this.reconnections = 0,
                            this.reconnectTimer = this.reconnectInterval,
                            this.secure = h.get(this.opts.connection.secure, !1),
                            this.emotes = "",
                            this.emotesets = {},
                            this.channels = [],
                            this.currentLatency = 0,
                            this.globaluserstate = {},
                            this.lastJoined = "",
                            this.latency = new Date,
                            this.moderators = {},
                            this.pingLoop = null,
                            this.pingTimeout = null,
                            this.reason = "",
                            this.username = "",
                            this.userstate = {},
                            this.wasCloseCalled = !1,
                            this.ws = null;
                            var s = "error";
                            this.opts.options.debug && (s = "info"),
                            this.log = this.opts.logger || r;
                            try {
                                r.setLevel(s)
                            } catch (e) {}
                            this.opts.channels.forEach((function(e, t, s) {
                                s[t] = h.channel(e)
                            }
                            )),
                            o.call(this)
                        };
                        for (var d in h.inherits(m, o),
                        m.prototype.api = n,
                        i)
                            m.prototype[d] = i[d];
                        m.prototype.handleMessage = function(e) {
                            var t = this;
                            if (!h.isNull(e)) {
                                this.emit("raw_message", JSON.parse(JSON.stringify(e)), e);
                                var s = h.channel(h.get(e.params[0], null))
                                  , n = h.get(e.params[1], null)
                                  , i = h.get(e.tags["msg-id"], null);
                                if (e.tags = a.badges(a.emotes(e.tags)),
                                e.tags)
                                    for (var o in e.tags)
                                        "emote-sets" !== o && "ban-duration" !== o && "bits" !== o && (h.isBoolean(e.tags[o]) ? e.tags[o] = null : "1" === e.tags[o] ? e.tags[o] = !0 : "0" === e.tags[o] && (e.tags[o] = !1));
                                if (h.isNull(e.prefix))
                                    switch (e.command) {
                                    case "PING":
                                        this.emit("ping"),
                                        h.isNull(this.ws) || 2 === this.ws.readyState || 3 === this.ws.readyState || this.ws.send("PONG");
                                        break;
                                    case "PONG":
                                        var r = new Date;
                                        this.currentLatency = (r.getTime() - this.latency.getTime()) / 1e3,
                                        this.emits(["pong", "_promisePing"], [[this.currentLatency]]),
                                        clearTimeout(this.pingTimeout);
                                        break;
                                    default:
                                        this.log.warn("Could not parse message with no prefix:\n" + JSON.stringify(e, null, 4))
                                    }
                                else if ("tmi.twitch.tv" === e.prefix)
                                    switch (e.command) {
                                    case "002":
                                    case "003":
                                    case "004":
                                    case "375":
                                    case "376":
                                    case "CAP":
                                        break;
                                    case "001":
                                        this.username = e.params[0];
                                        break;
                                    case "372":
                                        this.log.info("Connected to server."),
                                        this.userstate["#tmijs"] = {},
                                        this.emits(["connected", "_promiseConnect"], [[this.server, this.port], [null]]),
                                        this.reconnections = 0,
                                        this.reconnectTimer = this.reconnectInterval,
                                        this.pingLoop = setInterval((function() {
                                            h.isNull(t.ws) || 2 === t.ws.readyState || 3 === t.ws.readyState || t.ws.send("PING"),
                                            t.latency = new Date,
                                            t.pingTimeout = setTimeout((function() {
                                                h.isNull(t.ws) || (t.wasCloseCalled = !1,
                                                t.log.error("Ping timeout."),
                                                t.ws.close(),
                                                clearInterval(t.pingLoop),
                                                clearTimeout(t.pingTimeout))
                                            }
                                            ), h.get(t.opts.connection.timeout, 9999))
                                        }
                                        ), 6e4);
                                        var l = new c.queue(2e3)
                                          , u = h.union(this.opts.channels, this.channels);
                                        this.channels = [];
                                        for (var m = 0; m < u.length; m++) {
                                            var d = this;
                                            l.add(function(e) {
                                                h.isNull(d.ws) || 2 === d.ws.readyState || 3 === d.ws.readyState || d.ws.send("JOIN " + h.channel(u[e]))
                                            }
                                            .bind(this, m))
                                        }
                                        l.run();
                                        break;
                                    case "NOTICE":
                                        var f = [null]
                                          , p = [s, i, n]
                                          , g = [s, !0]
                                          , _ = [s, !1]
                                          , b = [p, f]
                                          , y = [p, [i]]
                                          , w = "[" + s + "] " + n;
                                        switch (i) {
                                        case "subs_on":
                                            this.log.info("[" + s + "] This room is now in subscribers-only mode."),
                                            this.emits(["subscriber", "subscribers", "_promiseSubscribers"], [g, g, f]);
                                            break;
                                        case "subs_off":
                                            this.log.info("[" + s + "] This room is no longer in subscribers-only mode."),
                                            this.emits(["subscriber", "subscribers", "_promiseSubscribersoff"], [_, _, f]);
                                            break;
                                        case "emote_only_on":
                                            this.log.info("[" + s + "] This room is now in emote-only mode."),
                                            this.emits(["emoteonly", "_promiseEmoteonly"], [g, f]);
                                            break;
                                        case "emote_only_off":
                                            this.log.info("[" + s + "] This room is no longer in emote-only mode."),
                                            this.emits(["emoteonly", "_promiseEmoteonlyoff"], [_, f]);
                                            break;
                                        case "slow_on":
                                        case "slow_off":
                                            break;
                                        case "followers_on_zero":
                                        case "followers_on":
                                        case "followers_off":
                                            break;
                                        case "r9k_on":
                                            this.log.info("[" + s + "] This room is now in r9k mode."),
                                            this.emits(["r9kmode", "r9kbeta", "_promiseR9kbeta"], [g, g, f]);
                                            break;
                                        case "r9k_off":
                                            this.log.info("[" + s + "] This room is no longer in r9k mode."),
                                            this.emits(["r9kmode", "r9kbeta", "_promiseR9kbetaoff"], [_, _, f]);
                                            break;
                                        case "room_mods":
                                            var v = n.split(": ")[1].toLowerCase().split(", ").filter((function(e) {
                                                return e
                                            }
                                            ));
                                            this.emits(["_promiseMods", "mods"], [[null, v], [s, v]]);
                                            break;
                                        case "no_mods":
                                            this.emits(["_promiseMods", "mods"], [[null, []], [s, []]]);
                                            break;
                                        case "vips_success":
                                            n.endsWith(".") && (n = n.slice(0, -1));
                                            var C = n.split(": ")[1].toLowerCase().split(", ").filter((function(e) {
                                                return e
                                            }
                                            ));
                                            this.emits(["_promiseVips", "vips"], [[null, C], [s, C]]);
                                            break;
                                        case "no_vips":
                                            this.emits(["_promiseVips", "vips"], [[null, []], [s, []]]);
                                            break;
                                        case "already_banned":
                                        case "bad_ban_admin":
                                        case "bad_ban_broadcaster":
                                        case "bad_ban_global_mod":
                                        case "bad_ban_self":
                                        case "bad_ban_staff":
                                        case "usage_ban":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseBan"], y);
                                            break;
                                        case "ban_success":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseBan"], b);
                                            break;
                                        case "usage_clear":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseClear"], y);
                                            break;
                                        case "usage_mods":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseMods"], [p, [i, []]]);
                                            break;
                                        case "mod_success":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseMod"], b);
                                            break;
                                        case "usage_vips":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseVips"], [p, [i, []]]);
                                            break;
                                        case "usage_vip":
                                        case "bad_vip_grantee_banned":
                                        case "bad_vip_grantee_already_vip":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseVip"], [p, [i, []]]);
                                            break;
                                        case "vip_success":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseVip"], b);
                                            break;
                                        case "usage_mod":
                                        case "bad_mod_banned":
                                        case "bad_mod_mod":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseMod"], y);
                                            break;
                                        case "unmod_success":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseUnmod"], b);
                                            break;
                                        case "unvip_success":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseUnvip"], b);
                                            break;
                                        case "usage_unmod":
                                        case "bad_unmod_mod":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseUnmod"], y);
                                            break;
                                        case "usage_unvip":
                                        case "bad_unvip_grantee_not_vip":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseUnvip"], y);
                                            break;
                                        case "color_changed":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseColor"], b);
                                            break;
                                        case "usage_color":
                                        case "turbo_only_color":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseColor"], y);
                                            break;
                                        case "commercial_success":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseCommercial"], b);
                                            break;
                                        case "usage_commercial":
                                        case "bad_commercial_error":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseCommercial"], y);
                                            break;
                                        case "hosts_remaining":
                                            this.log.info(w);
                                            var k = isNaN(n[0]) ? 0 : parseInt(n[0]);
                                            this.emits(["notice", "_promiseHost"], [p, [null, ~~k]]);
                                            break;
                                        case "bad_host_hosting":
                                        case "bad_host_rate_exceeded":
                                        case "bad_host_error":
                                        case "usage_host":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseHost"], [p, [i, null]]);
                                            break;
                                        case "already_r9k_on":
                                        case "usage_r9k_on":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseR9kbeta"], y);
                                            break;
                                        case "already_r9k_off":
                                        case "usage_r9k_off":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseR9kbetaoff"], y);
                                            break;
                                        case "timeout_success":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseTimeout"], b);
                                            break;
                                        case "delete_message_success":
                                            this.log.info("[" + s + " " + n + "]"),
                                            this.emits(["notice", "_promiseDeletemessage"], b);
                                        case "already_subs_off":
                                        case "usage_subs_off":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseSubscribersoff"], y);
                                            break;
                                        case "already_subs_on":
                                        case "usage_subs_on":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseSubscribers"], y);
                                            break;
                                        case "already_emote_only_off":
                                        case "usage_emote_only_off":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseEmoteonlyoff"], y);
                                            break;
                                        case "already_emote_only_on":
                                        case "usage_emote_only_on":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseEmoteonly"], y);
                                            break;
                                        case "usage_slow_on":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseSlow"], y);
                                            break;
                                        case "usage_slow_off":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseSlowoff"], y);
                                            break;
                                        case "usage_timeout":
                                        case "bad_timeout_admin":
                                        case "bad_timeout_broadcaster":
                                        case "bad_timeout_duration":
                                        case "bad_timeout_global_mod":
                                        case "bad_timeout_self":
                                        case "bad_timeout_staff":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseTimeout"], y);
                                            break;
                                        case "untimeout_success":
                                        case "unban_success":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseUnban"], b);
                                            break;
                                        case "usage_unban":
                                        case "bad_unban_no_ban":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseUnban"], y);
                                            break;
                                        case "usage_delete":
                                        case "bad_delete_message_error":
                                        case "bad_delete_message_broadcaster":
                                        case "bad_delete_message_mod":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseDeletemessage"], y);
                                            break;
                                        case "usage_unhost":
                                        case "not_hosting":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseUnhost"], y);
                                            break;
                                        case "whisper_invalid_login":
                                        case "whisper_invalid_self":
                                        case "whisper_limit_per_min":
                                        case "whisper_limit_per_sec":
                                        case "whisper_restricted_recipient":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseWhisper"], y);
                                            break;
                                        case "no_permission":
                                        case "msg_banned":
                                        case "msg_room_not_found":
                                        case "msg_channel_suspended":
                                        case "tos_ban":
                                            this.log.info(w),
                                            this.emits(["notice", "_promiseBan", "_promiseClear", "_promiseUnban", "_promiseTimeout", "_promiseDeletemessage", "_promiseMods", "_promiseMod", "_promiseUnmod", "_promiseVips", "_promiseVip", "_promiseUnvip", "_promiseCommercial", "_promiseHost", "_promiseUnhost", "_promiseJoin", "_promisePart", "_promiseR9kbeta", "_promiseR9kbetaoff", "_promiseSlow", "_promiseSlowoff", "_promiseFollowers", "_promiseFollowersoff", "_promiseSubscribers", "_promiseSubscribersoff", "_promiseEmoteonly", "_promiseEmoteonlyoff"], y);
                                            break;
                                        case "unrecognized_cmd":
                                            this.log.info(w),
                                            this.emit("notice", s, i, n),
                                            "/w" === n.split(" ").splice(-1)[0] && this.log.warn("You must be connected to a group server to send or receive whispers.");
                                            break;
                                        case "cmds_available":
                                        case "host_target_went_offline":
                                        case "msg_censored_broadcaster":
                                        case "msg_duplicate":
                                        case "msg_emoteonly":
                                        case "msg_verified_email":
                                        case "msg_ratelimit":
                                        case "msg_subsonly":
                                        case "msg_timedout":
                                        case "msg_bad_characters":
                                        case "msg_channel_blocked":
                                        case "msg_facebook":
                                        case "msg_followersonly":
                                        case "msg_followersonly_followed":
                                        case "msg_followersonly_zero":
                                        case "msg_rejected":
                                        case "msg_slowmode":
                                        case "msg_suspended":
                                        case "no_help":
                                        case "usage_disconnect":
                                        case "usage_help":
                                        case "usage_me":
                                            this.log.info(w),
                                            this.emit("notice", s, i, n);
                                            break;
                                        case "host_on":
                                        case "host_off":
                                            break;
                                        default:
                                            n.includes("Login unsuccessful") || n.includes("Login authentication failed") || n.includes("Error logging in") || n.includes("Improperly formatted auth") ? (this.wasCloseCalled = !1,
                                            this.reconnect = !1,
                                            this.reason = n,
                                            this.log.error(this.reason),
                                            this.ws.close()) : n.includes("Invalid NICK") ? (this.wasCloseCalled = !1,
                                            this.reconnect = !1,
                                            this.reason = "Invalid NICK.",
                                            this.log.error(this.reason),
                                            this.ws.close()) : this.log.warn("Could not parse NOTICE from tmi.twitch.tv:\n" + JSON.stringify(e, null, 4))
                                        }
                                        break;
                                    case "USERNOTICE":
                                        var S = e.tags["display-name"] || e.tags.login
                                          , x = e.tags["msg-param-sub-plan"] || ""
                                          , E = h.unescapeIRC(h.get(e.tags["msg-param-sub-plan-name"], "")) || null
                                          , T = x.includes("Prime")
                                          , N = e.tags
                                          , D = ~~(e.tags["msg-param-streak-months"] || 0)
                                          , I = e.tags["msg-param-recipient-display-name"] || e.tags["msg-param-recipient-user-name"]
                                          , P = ~~e.tags["msg-param-mass-gift-count"]
                                          , O = {
                                            prime: T,
                                            plan: x,
                                            planName: E
                                        };
                                        switch (N["message-type"] = i,
                                        i) {
                                        case "resub":
                                            this.emits(["resub", "subanniversary"], [[s, S, D, n, N, O]]);
                                            break;
                                        case "sub":
                                            this.emit("subscription", s, S, O, n, N);
                                            break;
                                        case "subgift":
                                            this.emit("subgift", s, S, D, I, O, N);
                                            break;
                                        case "anonsubgift":
                                            this.emit("anonsubgift", s, D, I, O, N);
                                            break;
                                        case "submysterygift":
                                            this.emit("submysterygift", s, S, P, O, N);
                                            break;
                                        case "anonsubmysterygift":
                                            this.emit("anonsubmysterygift", s, P, O, N);
                                            break;
                                        case "giftpaidupgrade":
                                            var R = e.tags["msg-param-sender-name"] || e.tags["msg-param-sender-login"];
                                            this.emit("giftpaidupgrade", s, S, R, N);
                                            break;
                                        case "anongiftpaidupgrade":
                                            this.emit("anongiftpaidupgrade", s, S, N);
                                            break;
                                        case "raid":
                                            S = e.tags["msg-param-displayName"] || e.tags["msg-param-login"];
                                            var M = e.tags["msg-param-viewerCount"];
                                            this.emit("raided", s, S, M)
                                        }
                                        break;
                                    case "HOSTTARGET":
                                        var L = n.split(" ");
                                        M = ~~L[1] || 0;
                                        "-" === L[0] ? (this.log.info("[" + s + "] Exited host mode."),
                                        this.emits(["unhost", "_promiseUnhost"], [[s, M], [null]])) : (this.log.info("[" + s + "] Now hosting " + L[0] + " for " + M + " viewer(s)."),
                                        this.emit("hosting", s, L[0], M));
                                        break;
                                    case "CLEARCHAT":
                                        if (e.params.length > 1) {
                                            var A = h.get(e.tags["ban-duration"], null);
                                            h.isNull(A) ? (this.log.info("[" + s + "] " + n + " has been banned."),
                                            this.emit("ban", s, n, null, e.tags)) : (this.log.info("[" + s + "] " + n + " has been timed out for " + A + " seconds."),
                                            this.emit("timeout", s, n, null, ~~A, e.tags))
                                        } else
                                            this.log.info("[" + s + "] Chat was cleared by a moderator."),
                                            this.emits(["clearchat", "_promiseClear"], [[s], [null]]);
                                        break;
                                    case "CLEARMSG":
                                        if (e.params.length > 1) {
                                            S = e.tags.login;
                                            var U = n;
                                            (N = e.tags)["message-type"] = "messagedeleted",
                                            this.log.info("[" + s + "] " + S + "'s message has been deleted."),
                                            this.emit("messagedeleted", s, S, U, N)
                                        }
                                        break;
                                    case "RECONNECT":
                                        this.log.info("Received RECONNECT request from Twitch.."),
                                        this.log.info("Disconnecting and reconnecting in " + Math.round(this.reconnectTimer / 1e3) + " seconds.."),
                                        this.disconnect(),
                                        setTimeout((function() {
                                            t.connect()
                                        }
                                        ), this.reconnectTimer);
                                        break;
                                    case "SERVERCHANGE":
                                        break;
                                    case "USERSTATE":
                                        e.tags.username = this.username,
                                        "mod" === e.tags["user-type"] && (this.moderators[this.lastJoined] || (this.moderators[this.lastJoined] = []),
                                        this.moderators[this.lastJoined].includes(this.username) || this.moderators[this.lastJoined].push(this.username)),
                                        h.isJustinfan(this.getUsername()) || this.userstate[s] || (this.userstate[s] = e.tags,
                                        this.lastJoined = s,
                                        this.channels.push(s),
                                        this.log.info("Joined " + s),
                                        this.emit("join", s, h.username(this.getUsername()), !0)),
                                        e.tags["emote-sets"] !== this.emotes && this._updateEmoteset(e.tags["emote-sets"]),
                                        this.userstate[s] = e.tags;
                                        break;
                                    case "GLOBALUSERSTATE":
                                        this.globaluserstate = e.tags,
                                        void 0 !== e.tags["emote-sets"] && this._updateEmoteset(e.tags["emote-sets"]);
                                        break;
                                    case "ROOMSTATE":
                                        if (h.channel(this.lastJoined) === h.channel(e.params[0]) && this.emit("_promiseJoin", null),
                                        e.tags.channel = h.channel(e.params[0]),
                                        this.emit("roomstate", h.channel(e.params[0]), e.tags),
                                        !e.tags.hasOwnProperty("subs-only")) {
                                            if (e.tags.hasOwnProperty("slow"))
                                                if ("boolean" != typeof e.tags.slow || e.tags.slow) {
                                                    var j = ~~e.tags.slow;
                                                    this.log.info("[" + s + "] This room is now in slow mode."),
                                                    this.emits(["slow", "slowmode", "_promiseSlow"], [[s, !0, j], [s, !0, j], [null]])
                                                } else
                                                    this.log.info("[" + s + "] This room is no longer in slow mode."),
                                                    this.emits(["slow", "slowmode", "_promiseSlowoff"], [[s, !1, 0], [s, !1, 0], [null]]);
                                            if (e.tags.hasOwnProperty("followers-only"))
                                                if ("-1" === e.tags["followers-only"])
                                                    this.log.info("[" + s + "] This room is no longer in followers-only mode."),
                                                    this.emits(["followersonly", "followersmode", "_promiseFollowersoff"], [[s, !1, 0], [s, !1, 0], [null]]);
                                                else {
                                                    j = ~~e.tags["followers-only"];
                                                    this.log.info("[" + s + "] This room is now in follower-only mode."),
                                                    this.emits(["followersonly", "followersmode", "_promiseFollowers"], [[s, !0, j], [s, !0, j], [null]])
                                                }
                                        }
                                        break;
                                    default:
                                        this.log.warn("Could not parse message from tmi.twitch.tv:\n" + JSON.stringify(e, null, 4))
                                    }
                                else if ("jtv" === e.prefix)
                                    switch (e.command) {
                                    case "MODE":
                                        "+o" === n ? (this.moderators[s] || (this.moderators[s] = []),
                                        this.moderators[s].includes(e.params[2]) || this.moderators[s].push(e.params[2]),
                                        this.emit("mod", s, e.params[2])) : "-o" === n && (this.moderators[s] || (this.moderators[s] = []),
                                        this.moderators[s].filter((function(t) {
                                            return t != e.params[2]
                                        }
                                        )),
                                        this.emit("unmod", s, e.params[2]));
                                        break;
                                    default:
                                        this.log.warn("Could not parse message from jtv:\n" + JSON.stringify(e, null, 4))
                                    }
                                else
                                    switch (e.command) {
                                    case "353":
                                        this.emit("names", e.params[2], e.params[3].split(" "));
                                        break;
                                    case "366":
                                        break;
                                    case "JOIN":
                                        var J = e.prefix.split("!")[0];
                                        h.isJustinfan(this.getUsername()) && this.username === J && (this.lastJoined = s,
                                        this.channels.push(s),
                                        this.log.info("Joined " + s),
                                        this.emit("join", s, J, !0)),
                                        this.username !== J && this.emit("join", s, J, !1);
                                        break;
                                    case "PART":
                                        var G, B = !1;
                                        J = e.prefix.split("!")[0];
                                        if (this.username === J)
                                            B = !0,
                                            this.userstate[s] && delete this.userstate[s],
                                            -1 !== (G = this.channels.indexOf(s)) && this.channels.splice(G, 1),
                                            -1 !== (G = this.opts.channels.indexOf(s)) && this.opts.channels.splice(G, 1),
                                            this.log.info("Left " + s),
                                            this.emit("_promisePart", null);
                                        this.emit("part", s, J, B);
                                        break;
                                    case "WHISPER":
                                        J = e.prefix.split("!")[0];
                                        this.log.info("[WHISPER] <" + J + ">: " + n),
                                        e.tags.hasOwnProperty("username") || (e.tags.username = J),
                                        e.tags["message-type"] = "whisper";
                                        var H = h.channel(e.tags.username);
                                        this.emits(["whisper", "message"], [[H, e.tags, n, !1]]);
                                        break;
                                    case "PRIVMSG":
                                        if (e.tags.username = e.prefix.split("!")[0],
                                        "jtv" === e.tags.username) {
                                            var q = h.username(n.split(" ")[0])
                                              , W = n.includes("auto");
                                            if (n.includes("hosting you for")) {
                                                var z = h.extractNumber(n);
                                                this.emit("hosted", s, q, z, W)
                                            } else
                                                n.includes("hosting you") && this.emit("hosted", s, q, 0, W)
                                        } else {
                                            var F = h.actionMessage(n);
                                            F ? (e.tags["message-type"] = "action",
                                            this.log.info("[" + s + "] *<" + e.tags.username + ">: " + F[1]),
                                            this.emits(["action", "message"], [[s, e.tags, F[1], !1]])) : e.tags.hasOwnProperty("bits") ? this.emit("cheer", s, e.tags, n) : (e.tags["message-type"] = "chat",
                                            this.log.info("[" + s + "] <" + e.tags.username + ">: " + n),
                                            this.emits(["chat", "message"], [[s, e.tags, n, !1]]))
                                        }
                                        break;
                                    default:
                                        this.log.warn("Could not parse message:\n" + JSON.stringify(e, null, 4))
                                    }
                            }
                        }
                        ,
                        m.prototype.connect = function() {
                            var e = this;
                            return new Promise((function(t, s) {
                                e.server = h.get(e.opts.connection.server, "irc-ws.chat.twitch.tv"),
                                e.port = h.get(e.opts.connection.port, 80),
                                e.secure && (e.port = 443),
                                443 === e.port && (e.secure = !0),
                                e.reconnectTimer = e.reconnectTimer * e.reconnectDecay,
                                e.reconnectTimer >= e.maxReconnectInterval && (e.reconnectTimer = e.maxReconnectInterval),
                                e._openConnection(),
                                e.once("_promiseConnect", (function(n) {
                                    n ? s(n) : t([e.server, ~~e.port])
                                }
                                ))
                            }
                            ))
                        }
                        ,
                        m.prototype._openConnection = function() {
                            this.ws = new u((this.secure ? "wss" : "ws") + "://" + this.server + ":" + this.port + "/","irc"),
                            this.ws.onmessage = this._onMessage.bind(this),
                            this.ws.onerror = this._onError.bind(this),
                            this.ws.onclose = this._onClose.bind(this),
                            this.ws.onopen = this._onOpen.bind(this)
                        }
                        ,
                        m.prototype._onOpen = function() {
                            h.isNull(this.ws) || 1 !== this.ws.readyState || (this.log.info("Connecting to " + this.server + " on port " + this.port + ".."),
                            this.emit("connecting", this.server, ~~this.port),
                            this.username = h.get(this.opts.identity.username, h.justinfan()),
                            this.password = h.password(h.get(this.opts.identity.password, "SCHMOOPIIE")),
                            this.log.info("Sending authentication to server.."),
                            this.emit("logon"),
                            this.ws.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership"),
                            this.ws.send("PASS " + this.password),
                            this.ws.send("NICK " + this.username),
                            this.ws.send("USER " + this.username + " 8 * :" + this.username))
                        }
                        ,
                        m.prototype._onMessage = function(e) {
                            var t = this;
                            e.data.split("\r\n").forEach((function(e) {
                                h.isNull(e) || t.handleMessage(a.msg(e))
                            }
                            ))
                        }
                        ,
                        m.prototype._onError = function() {
                            var e = this;
                            this.moderators = {},
                            this.userstate = {},
                            this.globaluserstate = {},
                            clearInterval(this.pingLoop),
                            clearTimeout(this.pingTimeout),
                            this.reason = h.isNull(this.ws) ? "Connection closed." : "Unable to connect.",
                            this.emits(["_promiseConnect", "disconnected"], [[this.reason]]),
                            this.reconnect && this.reconnections === this.maxReconnectAttempts && (this.emit("maxreconnect"),
                            this.log.error("Maximum reconnection attempts reached.")),
                            this.reconnect && !this.reconnecting && this.reconnections <= this.maxReconnectAttempts - 1 && (this.reconnecting = !0,
                            this.reconnections = this.reconnections + 1,
                            this.log.error("Reconnecting in " + Math.round(this.reconnectTimer / 1e3) + " seconds.."),
                            this.emit("reconnect"),
                            setTimeout((function() {
                                e.reconnecting = !1,
                                e.connect()
                            }
                            ), this.reconnectTimer)),
                            this.ws = null
                        }
                        ,
                        m.prototype._onClose = function() {
                            var e = this;
                            this.moderators = {},
                            this.userstate = {},
                            this.globaluserstate = {},
                            clearInterval(this.pingLoop),
                            clearTimeout(this.pingTimeout),
                            this.wasCloseCalled ? (this.wasCloseCalled = !1,
                            this.reason = "Connection closed.",
                            this.log.info(this.reason),
                            this.emits(["_promiseConnect", "_promiseDisconnect", "disconnected"], [[this.reason], [null], [this.reason]])) : (this.emits(["_promiseConnect", "disconnected"], [[this.reason]]),
                            this.reconnect && this.reconnections === this.maxReconnectAttempts && (this.emit("maxreconnect"),
                            this.log.error("Maximum reconnection attempts reached.")),
                            this.reconnect && !this.reconnecting && this.reconnections <= this.maxReconnectAttempts - 1 && (this.reconnecting = !0,
                            this.reconnections = this.reconnections + 1,
                            this.log.error("Could not connect to server. Reconnecting in " + Math.round(this.reconnectTimer / 1e3) + " seconds.."),
                            this.emit("reconnect"),
                            setTimeout((function() {
                                e.reconnecting = !1,
                                e.connect()
                            }
                            ), this.reconnectTimer))),
                            this.ws = null
                        }
                        ,
                        m.prototype._getPromiseDelay = function() {
                            return this.currentLatency <= 600 ? 600 : this.currentLatency + 100
                        }
                        ,
                        m.prototype._sendCommand = function(e, t, s, n) {
                            var i = this;
                            return new Promise((function(o, r) {
                                if (h.promiseDelay(e).then((function() {
                                    r("No response from Twitch.")
                                }
                                )),
                                h.isNull(i.ws) || 2 === i.ws.readyState || 3 === i.ws.readyState)
                                    r("Not connected to server.");
                                else {
                                    if (h.isNull(t))
                                        i.log.info("Executing command: " + s),
                                        i.ws.send(s);
                                    else {
                                        var a = h.channel(t);
                                        i.log.info("[" + a + "] Executing command: " + s),
                                        i.ws.send("PRIVMSG " + a + " :" + s)
                                    }
                                    n(o, r)
                                }
                            }
                            ))
                        }
                        ,
                        m.prototype._sendMessage = function(e, t, s, n) {
                            var i = this;
                            return new Promise((function(o, r) {
                                if (h.isNull(i.ws) || 2 === i.ws.readyState || 3 === i.ws.readyState || h.isJustinfan(i.getUsername()))
                                    r("Not connected to server.");
                                else {
                                    var c = h.channel(t);
                                    if (i.userstate[c] || (i.userstate[c] = {}),
                                    s.length >= 500) {
                                        var l = h.splitLine(s, 500);
                                        s = l[0],
                                        setTimeout((function() {
                                            i._sendMessage(e, t, l[1], (function() {}
                                            ))
                                        }
                                        ), 350)
                                    }
                                    i.ws.send("PRIVMSG " + c + " :" + s);
                                    var u = {};
                                    Object.keys(i.emotesets).forEach((function(e) {
                                        i.emotesets[e].forEach((function(e) {
                                            return h.isRegex(e.code) ? a.emoteRegex(s, e.code, e.id, u) : void a.emoteString(s, e.code, e.id, u)
                                        }
                                        ))
                                    }
                                    ));
                                    var m = h.merge(i.userstate[c], a.emotes({
                                        emotes: a.transformEmotes(u) || null
                                    }))
                                      , d = h.actionMessage(s);
                                    d ? (m["message-type"] = "action",
                                    i.log.info("[" + c + "] *<" + i.getUsername() + ">: " + d[1]),
                                    i.emits(["action", "message"], [[c, m, d[1], !0]])) : (m["message-type"] = "chat",
                                    i.log.info("[" + c + "] <" + i.getUsername() + ">: " + s),
                                    i.emits(["chat", "message"], [[c, m, s, !0]])),
                                    n(o, r)
                                }
                            }
                            ))
                        }
                        ,
                        m.prototype._updateEmoteset = function(e) {
                            var t = this;
                            this.emotes = e,
                            this.api({
                                url: "/chat/emoticon_images?emotesets=" + e,
                                headers: {
                                    Authorization: "OAuth " + h.password(h.get(this.opts.identity.password, "")).replace("oauth:", ""),
                                    "Client-ID": this.clientId
                                }
                            }, (function(s, n, i) {
                                return s ? void setTimeout((function() {
                                    t._updateEmoteset(e)
                                }
                                ), 6e4) : (t.emotesets = i.emoticon_sets || {},
                                t.emit("emotesets", e, t.emotesets))
                            }
                            ))
                        }
                        ,
                        m.prototype.getUsername = function() {
                            return this.username
                        }
                        ,
                        m.prototype.getOptions = function() {
                            return this.opts
                        }
                        ,
                        m.prototype.getChannels = function() {
                            return this.channels
                        }
                        ,
                        m.prototype.isMod = function(e, t) {
                            var s = h.channel(e);
                            return this.moderators[s] || (this.moderators[s] = []),
                            this.moderators[s].includes(h.username(t))
                        }
                        ,
                        m.prototype.readyState = function() {
                            return h.isNull(this.ws) ? "CLOSED" : ["CONNECTING", "OPEN", "CLOSING", "CLOSED"][this.ws.readyState]
                        }
                        ,
                        m.prototype.disconnect = function() {
                            var e = this;
                            return new Promise((function(t, s) {
                                h.isNull(e.ws) || 3 === e.ws.readyState ? (e.log.error("Cannot disconnect from server. Socket is not opened or connection is already closing."),
                                s("Cannot disconnect from server. Socket is not opened or connection is already closing.")) : (e.wasCloseCalled = !0,
                                e.log.info("Disconnecting from server.."),
                                e.ws.close(),
                                e.once("_promiseDisconnect", (function() {
                                    t([e.server, ~~e.port])
                                }
                                )))
                            }
                            ))
                        }
                        ,
                        m.prototype.utils = l,
                        void 0 !== s && s.exports && (s.exports = m),
                        "undefined" != typeof window && (window.tmi = {},
                        window.tmi.client = m,
                        window.tmi.Client = m)
                    }
                    ).call(this, void 0 !== t ? t : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                }
                , {
                    "./api": 2,
                    "./commands": 4,
                    "./events": 5,
                    "./extra-utils": 6,
                    "./logger": 7,
                    "./parser": 8,
                    "./timer": 9,
                    "./utils": 10,
                    ws: 11
                }],
                4: [function(e, t, s) {
                    "use strict";
                    function n(e, t) {
                        var s = this;
                        return e = u.channel(e),
                        t = u.get(t, 30),
                        this._sendCommand(this._getPromiseDelay(), e, "/followers " + t, (function(n, i) {
                            s.once("_promiseFollowers", (function(s) {
                                s ? i(s) : n([e, ~~t])
                            }
                            ))
                        }
                        ))
                    }
                    function i(e) {
                        var t = this;
                        return e = u.channel(e),
                        this._sendCommand(this._getPromiseDelay(), e, "/followersoff", (function(s, n) {
                            t.once("_promiseFollowersoff", (function(t) {
                                t ? n(t) : s([e])
                            }
                            ))
                        }
                        ))
                    }
                    function o(e) {
                        var t = this;
                        return e = u.channel(e),
                        this._sendCommand(this._getPromiseDelay(), null, "PART " + e, (function(s, n) {
                            t.once("_promisePart", (function(t) {
                                t ? n(t) : s([e])
                            }
                            ))
                        }
                        ))
                    }
                    function r(e) {
                        var t = this;
                        return e = u.channel(e),
                        this._sendCommand(this._getPromiseDelay(), e, "/r9kbeta", (function(s, n) {
                            t.once("_promiseR9kbeta", (function(t) {
                                t ? n(t) : s([e])
                            }
                            ))
                        }
                        ))
                    }
                    function a(e) {
                        var t = this;
                        return e = u.channel(e),
                        this._sendCommand(this._getPromiseDelay(), e, "/r9kbetaoff", (function(s, n) {
                            t.once("_promiseR9kbetaoff", (function(t) {
                                t ? n(t) : s([e])
                            }
                            ))
                        }
                        ))
                    }
                    function c(e, t) {
                        var s = this;
                        return e = u.channel(e),
                        t = u.get(t, 300),
                        this._sendCommand(this._getPromiseDelay(), e, "/slow " + t, (function(n, i) {
                            s.once("_promiseSlow", (function(s) {
                                s ? i(s) : n([e, ~~t])
                            }
                            ))
                        }
                        ))
                    }
                    function l(e) {
                        var t = this;
                        return e = u.channel(e),
                        this._sendCommand(this._getPromiseDelay(), e, "/slowoff", (function(s, n) {
                            t.once("_promiseSlowoff", (function(t) {
                                t ? n(t) : s([e])
                            }
                            ))
                        }
                        ))
                    }
                    var u = e("./utils");
                    t.exports = {
                        action: function(e, t) {
                            return e = u.channel(e),
                            t = "ACTION " + t + "",
                            this._sendMessage(this._getPromiseDelay(), e, t, (function(s, n) {
                                s([e, t])
                            }
                            ))
                        },
                        ban: function(e, t, s) {
                            var n = this;
                            return e = u.channel(e),
                            t = u.username(t),
                            s = u.get(s, ""),
                            this._sendCommand(this._getPromiseDelay(), e, "/ban " + t + " " + s, (function(i, o) {
                                n.once("_promiseBan", (function(n) {
                                    n ? o(n) : i([e, t, s])
                                }
                                ))
                            }
                            ))
                        },
                        clear: function(e) {
                            var t = this;
                            return e = u.channel(e),
                            this._sendCommand(this._getPromiseDelay(), e, "/clear", (function(s, n) {
                                t.once("_promiseClear", (function(t) {
                                    t ? n(t) : s([e])
                                }
                                ))
                            }
                            ))
                        },
                        color: function(e, t) {
                            var s = this;
                            return t = u.get(t, e),
                            this._sendCommand(this._getPromiseDelay(), "#tmijs", "/color " + t, (function(e, n) {
                                s.once("_promiseColor", (function(s) {
                                    s ? n(s) : e([t])
                                }
                                ))
                            }
                            ))
                        },
                        commercial: function(e, t) {
                            var s = this;
                            return e = u.channel(e),
                            t = u.get(t, 30),
                            this._sendCommand(this._getPromiseDelay(), e, "/commercial " + t, (function(n, i) {
                                s.once("_promiseCommercial", (function(s) {
                                    s ? i(s) : n([e, ~~t])
                                }
                                ))
                            }
                            ))
                        },
                        deletemessage: function(e, t) {
                            var s = this;
                            return e = u.channel(e),
                            this._sendCommand(this._getPromiseDelay(), e, "/delete " + t, (function(t, n) {
                                s.once("_promiseDeletemessage", (function(s) {
                                    s ? n(s) : t([e])
                                }
                                ))
                            }
                            ))
                        },
                        emoteonly: function(e) {
                            var t = this;
                            return e = u.channel(e),
                            this._sendCommand(this._getPromiseDelay(), e, "/emoteonly", (function(s, n) {
                                t.once("_promiseEmoteonly", (function(t) {
                                    t ? n(t) : s([e])
                                }
                                ))
                            }
                            ))
                        },
                        emoteonlyoff: function(e) {
                            var t = this;
                            return e = u.channel(e),
                            this._sendCommand(this._getPromiseDelay(), e, "/emoteonlyoff", (function(s, n) {
                                t.once("_promiseEmoteonlyoff", (function(t) {
                                    t ? n(t) : s([e])
                                }
                                ))
                            }
                            ))
                        },
                        followersonly: n,
                        followersmode: n,
                        followersonlyoff: i,
                        followersmodeoff: i,
                        host: function(e, t) {
                            var s = this;
                            return e = u.channel(e),
                            t = u.username(t),
                            this._sendCommand(2e3, e, "/host " + t, (function(n, i) {
                                s.once("_promiseHost", (function(s, o) {
                                    s ? i(s) : n([e, t, ~~o])
                                }
                                ))
                            }
                            ))
                        },
                        join: function(e) {
                            var t = this;
                            return e = u.channel(e),
                            this._sendCommand(this._getPromiseDelay(), null, "JOIN " + e, (function(s, n) {
                                t.once("_promiseJoin", (function(t) {
                                    t ? n(t) : s([e])
                                }
                                ))
                            }
                            ))
                        },
                        mod: function(e, t) {
                            var s = this;
                            return e = u.channel(e),
                            t = u.username(t),
                            this._sendCommand(this._getPromiseDelay(), e, "/mod " + t, (function(n, i) {
                                s.once("_promiseMod", (function(s) {
                                    s ? i(s) : n([e, t])
                                }
                                ))
                            }
                            ))
                        },
                        mods: function(e) {
                            var t = this;
                            return e = u.channel(e),
                            this._sendCommand(this._getPromiseDelay(), e, "/mods", (function(s, n) {
                                t.once("_promiseMods", (function(i, o) {
                                    i ? n(i) : (o.forEach((function(s) {
                                        t.moderators[e] || (t.moderators[e] = []),
                                        t.moderators[e].includes(s) || t.moderators[e].push(s)
                                    }
                                    )),
                                    s(o))
                                }
                                ))
                            }
                            ))
                        },
                        part: o,
                        leave: o,
                        ping: function() {
                            var e = this;
                            return this._sendCommand(this._getPromiseDelay(), null, "PING", (function(t, s) {
                                e.latency = new Date,
                                e.pingTimeout = setTimeout((function() {
                                    null !== e.ws && (e.wasCloseCalled = !1,
                                    e.log.error("Ping timeout."),
                                    e.ws.close(),
                                    clearInterval(e.pingLoop),
                                    clearTimeout(e.pingTimeout))
                                }
                                ), u.get(e.opts.connection.timeout, 9999)),
                                e.once("_promisePing", (function(e) {
                                    t([parseFloat(e)])
                                }
                                ))
                            }
                            ))
                        },
                        r9kbeta: r,
                        r9kmode: r,
                        r9kbetaoff: a,
                        r9kmodeoff: a,
                        raw: function(e) {
                            return this._sendCommand(this._getPromiseDelay(), null, e, (function(t, s) {
                                t([e])
                            }
                            ))
                        },
                        say: function(e, t) {
                            return e = u.channel(e),
                            t.startsWith(".") && !t.startsWith("..") || t.startsWith("/") || t.startsWith("\\") ? "me " === t.substr(1, 3) ? this.action(e, t.substr(4)) : this._sendCommand(this._getPromiseDelay(), e, t, (function(s, n) {
                                s([e, t])
                            }
                            )) : this._sendMessage(this._getPromiseDelay(), e, t, (function(s, n) {
                                s([e, t])
                            }
                            ))
                        },
                        slow: c,
                        slowmode: c,
                        slowoff: l,
                        slowmodeoff: l,
                        subscribers: function(e) {
                            var t = this;
                            return e = u.channel(e),
                            this._sendCommand(this._getPromiseDelay(), e, "/subscribers", (function(s, n) {
                                t.once("_promiseSubscribers", (function(t) {
                                    t ? n(t) : s([e])
                                }
                                ))
                            }
                            ))
                        },
                        subscribersoff: function(e) {
                            var t = this;
                            return e = u.channel(e),
                            this._sendCommand(this._getPromiseDelay(), e, "/subscribersoff", (function(s, n) {
                                t.once("_promiseSubscribersoff", (function(t) {
                                    t ? n(t) : s([e])
                                }
                                ))
                            }
                            ))
                        },
                        timeout: function(e, t, s, n) {
                            var i = this;
                            return e = u.channel(e),
                            t = u.username(t),
                            u.isNull(s) || u.isInteger(s) || (n = s,
                            s = 300),
                            s = u.get(s, 300),
                            n = u.get(n, ""),
                            this._sendCommand(this._getPromiseDelay(), e, "/timeout " + t + " " + s + " " + n, (function(o, r) {
                                i.once("_promiseTimeout", (function(i) {
                                    i ? r(i) : o([e, t, ~~s, n])
                                }
                                ))
                            }
                            ))
                        },
                        unban: function(e, t) {
                            var s = this;
                            return e = u.channel(e),
                            t = u.username(t),
                            this._sendCommand(this._getPromiseDelay(), e, "/unban " + t, (function(n, i) {
                                s.once("_promiseUnban", (function(s) {
                                    s ? i(s) : n([e, t])
                                }
                                ))
                            }
                            ))
                        },
                        unhost: function(e) {
                            var t = this;
                            return e = u.channel(e),
                            this._sendCommand(2e3, e, "/unhost", (function(s, n) {
                                t.once("_promiseUnhost", (function(t) {
                                    t ? n(t) : s([e])
                                }
                                ))
                            }
                            ))
                        },
                        unmod: function(e, t) {
                            var s = this;
                            return e = u.channel(e),
                            t = u.username(t),
                            this._sendCommand(this._getPromiseDelay(), e, "/unmod " + t, (function(n, i) {
                                s.once("_promiseUnmod", (function(s) {
                                    s ? i(s) : n([e, t])
                                }
                                ))
                            }
                            ))
                        },
                        unvip: function(e, t) {
                            var s = this;
                            return e = u.channel(e),
                            t = u.username(t),
                            this._sendCommand(this._getPromiseDelay(), e, "/unvip " + t, (function(n, i) {
                                s.once("_promiseUnvip", (function(s) {
                                    s ? i(s) : n([e, t])
                                }
                                ))
                            }
                            ))
                        },
                        vip: function(e, t) {
                            var s = this;
                            return e = u.channel(e),
                            t = u.username(t),
                            this._sendCommand(this._getPromiseDelay(), e, "/vip " + t, (function(n, i) {
                                s.once("_promiseVip", (function(s) {
                                    s ? i(s) : n([e, t])
                                }
                                ))
                            }
                            ))
                        },
                        vips: function(e) {
                            var t = this;
                            return e = u.channel(e),
                            this._sendCommand(this._getPromiseDelay(), e, "/vips", (function(e, s) {
                                t.once("_promiseVips", (function(t, n) {
                                    t ? s(t) : e(n)
                                }
                                ))
                            }
                            ))
                        },
                        whisper: function(e, t) {
                            var s = this;
                            return (e = u.username(e)) === this.getUsername() ? Promise.reject("Cannot send a whisper to the same account.") : this._sendCommand(this._getPromiseDelay(), "#tmijs", "/w " + e + " " + t, (function(n, i) {
                                var o = u.channel(e)
                                  , r = u.merge({
                                    "message-type": "whisper",
                                    "message-id": null,
                                    "thread-id": null,
                                    username: s.getUsername()
                                }, s.globaluserstate);
                                s.emits(["whisper", "message"], [[o, r, t, !0], [o, r, t, !0]]),
                                n([e, t])
                            }
                            ))
                        }
                    }
                }
                , {
                    "./utils": 10
                }],
                5: [function(e, t, s) {
                    "use strict";
                    function n() {
                        this._events = this._events || {},
                        this._maxListeners = this._maxListeners || void 0
                    }
                    function i(e) {
                        return "function" == typeof e
                    }
                    function o(e) {
                        return "object" === (void 0 === e ? "undefined" : a(e)) && null !== e
                    }
                    function r(e) {
                        return void 0 === e
                    }
                    var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    }
                    : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }
                    ;
                    String.prototype.startsWith || (String.prototype.startsWith = function(e, t) {
                        return t = t || 0,
                        this.indexOf(e, t) === t
                    }
                    ),
                    t.exports = n,
                    n.EventEmitter = n,
                    n.prototype._events = void 0,
                    n.prototype._maxListeners = void 0,
                    n.defaultMaxListeners = 10,
                    n.prototype.setMaxListeners = function(e) {
                        if (!function(e) {
                            return "number" == typeof e
                        }(e) || 0 > e || isNaN(e))
                            throw TypeError("n must be a positive number");
                        return this._maxListeners = e,
                        this
                    }
                    ,
                    n.prototype.emits = function(e, t) {
                        for (var s = 0; s < e.length; s++) {
                            var n = s < t.length ? t[s] : t[t.length - 1];
                            this.emit.apply(this, [e[s]].concat(n))
                        }
                    }
                    ,
                    n.prototype.emit = function(e) {
                        var t, s, n, a, c, l;
                        if (this._events || (this._events = {}),
                        "error" === e && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
                            if ((t = arguments[1])instanceof Error)
                                throw t;
                            throw TypeError('Uncaught, unspecified "error" event.')
                        }
                        if (r(s = this._events[e]))
                            return !1;
                        if (i(s))
                            switch (arguments.length) {
                            case 1:
                                s.call(this);
                                break;
                            case 2:
                                s.call(this, arguments[1]);
                                break;
                            case 3:
                                s.call(this, arguments[1], arguments[2]);
                                break;
                            default:
                                a = Array.prototype.slice.call(arguments, 1),
                                s.apply(this, a)
                            }
                        else if (o(s))
                            for (a = Array.prototype.slice.call(arguments, 1),
                            n = (l = s.slice()).length,
                            c = 0; n > c; c++)
                                l[c].apply(this, a);
                        return !0
                    }
                    ,
                    n.prototype.addListener = function(e, t) {
                        var s;
                        if (!i(t))
                            throw TypeError("listener must be a function");
                        return this._events || (this._events = {}),
                        this._events.newListener && this.emit("newListener", e, i(t.listener) ? t.listener : t),
                        this._events[e] ? o(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t,
                        o(this._events[e]) && !this._events[e].warned && ((s = r(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && s > 0 && this._events[e].length > s && (this._events[e].warned = !0,
                        console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length),
                        "function" == typeof console.trace && console.trace())),
                        this
                    }
                    ,
                    n.prototype.on = n.prototype.addListener,
                    n.prototype.once = function(e, t) {
                        function s() {
                            "_" !== e.charAt(0) || isNaN(e.substr(e.length - 1)) || (e = e.substring(0, e.length - 1)),
                            this.removeListener(e, s),
                            n || (n = !0,
                            t.apply(this, arguments))
                        }
                        if (!i(t))
                            throw TypeError("listener must be a function");
                        var n = !1;
                        if (this._events.hasOwnProperty(e) && "_" === e.charAt(0)) {
                            var o = 1
                              , r = e;
                            for (var a in this._events)
                                this._events.hasOwnProperty(a) && a.startsWith(r) && o++;
                            e += o
                        }
                        return s.listener = t,
                        this.on(e, s),
                        this
                    }
                    ,
                    n.prototype.removeListener = function(e, t) {
                        var s, n, r, a;
                        if (!i(t))
                            throw TypeError("listener must be a function");
                        if (!this._events || !this._events[e])
                            return this;
                        if (r = (s = this._events[e]).length,
                        n = -1,
                        s === t || i(s.listener) && s.listener === t) {
                            if (delete this._events[e],
                            this._events.hasOwnProperty(e + "2") && "_" === e.charAt(0)) {
                                var c = e;
                                for (var l in this._events)
                                    this._events.hasOwnProperty(l) && l.startsWith(c) && (isNaN(parseInt(l.substr(l.length - 1))) || (this._events[e + parseInt(l.substr(l.length - 1) - 1)] = this._events[l],
                                    delete this._events[l]));
                                this._events[e] = this._events[e + "1"],
                                delete this._events[e + "1"]
                            }
                            this._events.removeListener && this.emit("removeListener", e, t)
                        } else if (o(s)) {
                            for (a = r; a-- > 0; )
                                if (s[a] === t || s[a].listener && s[a].listener === t) {
                                    n = a;
                                    break
                                }
                            if (0 > n)
                                return this;
                            1 === s.length ? (s.length = 0,
                            delete this._events[e]) : s.splice(n, 1),
                            this._events.removeListener && this.emit("removeListener", e, t)
                        }
                        return this
                    }
                    ,
                    n.prototype.removeAllListeners = function(e) {
                        var t, s;
                        if (!this._events)
                            return this;
                        if (!this._events.removeListener)
                            return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e],
                            this;
                        if (0 === arguments.length) {
                            for (t in this._events)
                                "removeListener" !== t && this.removeAllListeners(t);
                            return this.removeAllListeners("removeListener"),
                            this._events = {},
                            this
                        }
                        if (i(s = this._events[e]))
                            this.removeListener(e, s);
                        else if (s)
                            for (; s.length; )
                                this.removeListener(e, s[s.length - 1]);
                        return delete this._events[e],
                        this
                    }
                    ,
                    n.prototype.listeners = function(e) {
                        return this._events && this._events[e] ? i(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
                    }
                    ,
                    n.prototype.listenerCount = function(e) {
                        if (this._events) {
                            var t = this._events[e];
                            if (i(t))
                                return 1;
                            if (t)
                                return t.length
                        }
                        return 0
                    }
                    ,
                    n.listenerCount = function(e, t) {
                        return e.listenerCount(t)
                    }
                }
                , {}],
                6: [function(e, t, s) {
                    "use strict";
                    var n = e("./utils");
                    t.exports = {
                        levenshtein: function(e, t, s) {
                            if ((s = n.get(s, !1)) || (e = e.toLowerCase(),
                            t = t.toLowerCase()),
                            e == t)
                                return 0;
                            var i = e.length
                              , o = t.length;
                            if (0 === i)
                                return 1 * o;
                            if (0 === o)
                                return 1 * i;
                            var r = !1;
                            try {
                                r = !"0"[0]
                            } catch (e) {
                                r = !0
                            }
                            r && (e = e.split(""),
                            t = t.split(""));
                            var a, c, l, u, h, m, d = new Array(o + 1), f = new Array(o + 1);
                            for (c = 0; o >= c; c++)
                                d[c] = 1 * c;
                            for (a = 0; i > a; a++) {
                                for (f[0] = d[0] + 1,
                                c = 0; o > c; c++)
                                    (l = d[c] + (e[a] == t[c] ? 0 : 1)) > (u = d[c + 1] + 1) && (l = u),
                                    l > (h = f[c] + 1) && (l = h),
                                    f[c + 1] = l;
                                m = d,
                                d = f,
                                f = m
                            }
                            return d[o]
                        },
                        raffle: {
                            init: function(e) {
                                this.raffleChannels || (this.raffleChannels = {}),
                                this.raffleChannels[n.channel(e)] || (this.raffleChannels[n.channel(e)] = [])
                            },
                            enter: function(e, t) {
                                this.init(e),
                                this.raffleChannels[n.channel(e)].push(t.toLowerCase())
                            },
                            leave: function(e, t) {
                                this.init(e);
                                var s = this.raffleChannels[n.channel(e)].indexOf(n.username(t));
                                return s >= 0 && (this.raffleChannels[n.channel(e)].splice(s, 1),
                                !0)
                            },
                            pick: function(e) {
                                this.init(e);
                                var t = this.raffleChannels[n.channel(e)].length;
                                return t >= 1 ? this.raffleChannels[n.channel(e)][Math.floor(Math.random() * t)] : null
                            },
                            reset: function(e) {
                                this.init(e),
                                this.raffleChannels[n.channel(e)] = []
                            },
                            count: function(e) {
                                return this.init(e),
                                this.raffleChannels[n.channel(e)] ? this.raffleChannels[n.channel(e)].length : 0
                            },
                            isParticipating: function(e, t) {
                                return this.init(e),
                                this.raffleChannels[n.channel(e)].includes(n.username(t))
                            }
                        },
                        symbols: function(e) {
                            for (var t = 0, s = 0; s < e.length; s++) {
                                var n = e.substring(s, s + 1).charCodeAt(0);
                                (30 >= n || n >= 127 || 65533 === n) && t++
                            }
                            return Math.ceil(t / e.length * 100) / 100
                        },
                        uppercase: function(e) {
                            var t = e.length
                              , s = e.match(/[A-Z]/g);
                            return n.isNull(s) ? 0 : s.length / t
                        }
                    }
                }
                , {
                    "./utils": 10
                }],
                7: [function(e, t, s) {
                    "use strict";
                    function n(e) {
                        return function(t) {
                            r[e] >= r[o] && console.log("[" + i.formatDate(new Date) + "] " + e + ": " + t)
                        }
                    }
                    var i = e("./utils")
                      , o = "info"
                      , r = {
                        trace: 0,
                        debug: 1,
                        info: 2,
                        warn: 3,
                        error: 4,
                        fatal: 5
                    };
                    t.exports = {
                        setLevel: function(e) {
                            o = e
                        },
                        trace: n("trace"),
                        debug: n("debug"),
                        info: n("info"),
                        warn: n("warn"),
                        error: n("error"),
                        fatal: n("fatal")
                    }
                }
                , {
                    "./utils": 10
                }],
                8: [function(e, t, s) {
                    "use strict";
                    var n = e("./utils");
                    t.exports = {
                        badges: function(e) {
                            if (n.isString(e.badges)) {
                                for (var t = {}, s = e.badges.split(","), i = 0; i < s.length; i++) {
                                    var o = s[i].split("/");
                                    if (!o[1])
                                        return;
                                    t[o[0]] = o[1]
                                }
                                e["badges-raw"] = e.badges,
                                e.badges = t
                            }
                            return n.isBoolean(e.badges) && (e["badges-raw"] = null),
                            e
                        },
                        emotes: function(e) {
                            if (n.isString(e.emotes)) {
                                for (var t = e.emotes.split("/"), s = {}, i = 0; i < t.length; i++) {
                                    var o = t[i].split(":");
                                    if (!o[1])
                                        return;
                                    s[o[0]] = o[1].split(",")
                                }
                                e["emotes-raw"] = e.emotes,
                                e.emotes = s
                            }
                            return n.isBoolean(e.emotes) && (e["emotes-raw"] = null),
                            e
                        },
                        emoteRegex: function(e, t, s, i) {
                            for (var o, r = /\S+/g, a = new RegExp("(\\b|^|s)" + n.unescapeHtml(t) + "(\\b|$|s)"); null !== (o = r.exec(e)); )
                                a.test(o[0]) && (i[s] = i[s] || [],
                                i[s].push([o.index, r.lastIndex - 1]))
                        },
                        emoteString: function(e, t, s, i) {
                            for (var o, r = /\S+/g; null !== (o = r.exec(e)); )
                                o[0] === n.unescapeHtml(t) && (i[s] = i[s] || [],
                                i[s].push([o.index, r.lastIndex - 1]))
                        },
                        transformEmotes: function(e) {
                            var t = "";
                            return Object.keys(e).forEach((function(s) {
                                t = t + s + ":",
                                e[s].forEach((function(e) {
                                    t = t + e.join("-") + ","
                                }
                                )),
                                t = t.slice(0, -1) + "/"
                            }
                            )),
                            t.slice(0, -1)
                        },
                        msg: function(e) {
                            var t = {
                                raw: e,
                                tags: {},
                                prefix: null,
                                command: null,
                                params: []
                            }
                              , s = 0
                              , n = 0;
                            if (64 === e.charCodeAt(0)) {
                                if (-1 === (n = e.indexOf(" ")))
                                    return null;
                                for (var i = e.slice(1, n).split(";"), o = 0; o < i.length; o++) {
                                    var r = i[o]
                                      , a = r.split("=");
                                    t.tags[a[0]] = r.substring(r.indexOf("=") + 1) || !0
                                }
                                s = n + 1
                            }
                            for (; 32 === e.charCodeAt(s); )
                                s++;
                            if (58 === e.charCodeAt(s)) {
                                if (-1 === (n = e.indexOf(" ", s)))
                                    return null;
                                for (t.prefix = e.slice(s + 1, n),
                                s = n + 1; 32 === e.charCodeAt(s); )
                                    s++
                            }
                            if (-1 === (n = e.indexOf(" ", s)))
                                return e.length > s ? (t.command = e.slice(s),
                                t) : null;
                            for (t.command = e.slice(s, n),
                            s = n + 1; 32 === e.charCodeAt(s); )
                                s++;
                            for (; s < e.length; ) {
                                if (n = e.indexOf(" ", s),
                                58 === e.charCodeAt(s)) {
                                    t.params.push(e.slice(s + 1));
                                    break
                                }
                                if (-1 === n) {
                                    if (-1 === n) {
                                        t.params.push(e.slice(s));
                                        break
                                    }
                                } else
                                    for (t.params.push(e.slice(s, n)),
                                    s = n + 1; 32 === e.charCodeAt(s); )
                                        s++
                            }
                            return t
                        }
                    }
                }
                , {
                    "./utils": 10
                }],
                9: [function(e, t, s) {
                    "use strict";
                    function n(e) {
                        this.queue = [],
                        this.index = 0,
                        this.defaultDelay = e || 3e3
                    }
                    n.prototype.add = function(e, t) {
                        this.queue.push({
                            fn: e,
                            delay: t
                        })
                    }
                    ,
                    n.prototype.run = function(e) {
                        (e || 0 === e) && (this.index = e),
                        this.next()
                    }
                    ,
                    n.prototype.next = function() {
                        var e = this
                          , t = this.index++
                          , s = this.queue[t]
                          , n = this.queue[this.index];
                        s && (s.fn(),
                        n && setTimeout((function() {
                            e.next()
                        }
                        ), n.delay || this.defaultDelay))
                    }
                    ,
                    n.prototype.reset = function() {
                        this.index = 0
                    }
                    ,
                    n.prototype.clear = function() {
                        this.index = 0,
                        this.queue = []
                    }
                    ,
                    s.queue = n
                }
                , {}],
                10: [function(e, t, s) {
                    (function(e) {
                        "use strict";
                        var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                            return typeof e
                        }
                        : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        }
                          , n = /^\u0001ACTION ([^\u0001]+)\u0001$/
                          , i = /^(justinfan)(\d+$)/
                          , o = /\\([sn:r\\])/g
                          , r = {
                            s: " ",
                            n: "",
                            ":": ";",
                            r: ""
                        }
                          , a = t.exports = {
                            get: function(e, t) {
                                return void 0 === e ? t : e
                            },
                            isBoolean: function(e) {
                                return "boolean" == typeof e
                            },
                            isFinite: function(e) {
                                function t(t) {
                                    return e.apply(this, arguments)
                                }
                                return t.toString = function() {
                                    return e.toString()
                                }
                                ,
                                t
                            }((function(e) {
                                return isFinite(e) && !isNaN(parseFloat(e))
                            }
                            )),
                            isInteger: function(e) {
                                return !isNaN(a.toNumber(e, 0))
                            },
                            isJustinfan: function(e) {
                                return i.test(e)
                            },
                            isNull: function(e) {
                                return null === e
                            },
                            isRegex: function(e) {
                                return /[\|\\\^\$\*\+\?\:\#]/.test(e)
                            },
                            isString: function(e) {
                                return "string" == typeof e
                            },
                            isURL: function(e) {
                                return RegExp("^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$", "i").test(e)
                            },
                            justinfan: function() {
                                return "justinfan" + Math.floor(8e4 * Math.random() + 1e3)
                            },
                            password: function(e) {
                                return ["SCHMOOPIIE", "", null].includes(e) ? "SCHMOOPIIE" : "oauth:" + e.toLowerCase().replace("oauth:", "")
                            },
                            promiseDelay: function(e) {
                                return new Promise((function(t) {
                                    setTimeout(t, e)
                                }
                                ))
                            },
                            replaceAll: function(e, t) {
                                if (null == e)
                                    return null;
                                for (var s in t)
                                    e = e.replace(new RegExp(s,"g"), t[s]);
                                return e
                            },
                            unescapeHtml: function(e) {
                                return e.replace(/\\&amp\\;/g, "&").replace(/\\&lt\\;/g, "<").replace(/\\&gt\\;/g, ">").replace(/\\&quot\\;/g, '"').replace(/\\&#039\\;/g, "'")
                            },
                            unescapeIRC: function(e) {
                                return e && e.includes("\\") ? e.replace(o, (function(e, t) {
                                    return t in r ? r[t] : t
                                }
                                )) : e
                            },
                            actionMessage: function(e) {
                                return e.match(n)
                            },
                            addWord: function(e, t) {
                                return e.length ? e + " " + t : e + t
                            },
                            channel: function(e) {
                                var t = (e || "").toLowerCase();
                                return "#" === t[0] ? t : "#" + t
                            },
                            extractNumber: function(e) {
                                for (var t = e.split(" "), s = 0; s < t.length; s++)
                                    if (a.isInteger(t[s]))
                                        return ~~t[s];
                                return 0
                            },
                            formatDate: function(e) {
                                var t = e.getHours()
                                  , s = e.getMinutes();
                                return (t = (10 > t ? "0" : "") + t) + ":" + (s = (10 > s ? "0" : "") + s)
                            },
                            inherits: function(e, t) {
                                e.super_ = t;
                                var s = function() {};
                                s.prototype = t.prototype,
                                e.prototype = new s,
                                e.prototype.constructor = e
                            },
                            isNode: function() {
                                try {
                                    return t.exports = "object" === (void 0 === e ? "undefined" : s(e)) && "[object process]" === Object.prototype.toString.call(e)
                                } catch (e) {
                                    return !1
                                }
                            },
                            isExtension: function() {
                                try {
                                    return !!(window.chrome && chrome.runtime && chrome.runtime.id)
                                } catch (e) {
                                    return !1
                                }
                            },
                            merge: Object.assign,
                            splitLine: function(e, t) {
                                var s = e.substring(0, t).lastIndexOf(" ");
                                return -1 === s && (s = t - 1),
                                [e.substring(0, s), e.substring(s + 1)]
                            },
                            toNumber: function(e, t) {
                                if (null === e)
                                    return 0;
                                var s = Math.pow(10, a.isFinite(t) ? t : 0);
                                return Math.round(e * s) / s
                            },
                            union: function(e, t) {
                                for (var s = {}, n = [], i = 0; i < e.length; i++) {
                                    s[o = e[i]] || (s[o] = !0,
                                    n.push(o))
                                }
                                for (i = 0; i < t.length; i++) {
                                    var o;
                                    s[o = t[i]] || (s[o] = !0,
                                    n.push(o))
                                }
                                return n
                            },
                            username: function(e) {
                                var t = (e || "").toLowerCase();
                                return "#" === t[0] ? t.slice(1) : t
                            }
                        }
                    }
                    ).call(this, e("_process"))
                }
                , {
                    _process: 12
                }],
                11: [function(e, t, s) {}
                , {}],
                12: [function(e, t, s) {
                    function n() {
                        throw new Error("setTimeout has not been defined")
                    }
                    function i() {
                        throw new Error("clearTimeout has not been defined")
                    }
                    function o(e) {
                        if (u === setTimeout)
                            return setTimeout(e, 0);
                        if ((u === n || !u) && setTimeout)
                            return u = setTimeout,
                            setTimeout(e, 0);
                        try {
                            return u(e, 0)
                        } catch (t) {
                            try {
                                return u.call(null, e, 0)
                            } catch (t) {
                                return u.call(this, e, 0)
                            }
                        }
                    }
                    function r() {
                        p && d && (p = !1,
                        d.length ? f = d.concat(f) : g = -1,
                        f.length && a())
                    }
                    function a() {
                        if (!p) {
                            var e = o(r);
                            p = !0;
                            for (var t = f.length; t; ) {
                                for (d = f,
                                f = []; ++g < t; )
                                    d && d[g].run();
                                g = -1,
                                t = f.length
                            }
                            d = null,
                            p = !1,
                            function(e) {
                                if (h === clearTimeout)
                                    return clearTimeout(e);
                                if ((h === i || !h) && clearTimeout)
                                    return h = clearTimeout,
                                    clearTimeout(e);
                                try {
                                    h(e)
                                } catch (t) {
                                    try {
                                        return h.call(null, e)
                                    } catch (t) {
                                        return h.call(this, e)
                                    }
                                }
                            }(e)
                        }
                    }
                    function c(e, t) {
                        this.fun = e,
                        this.array = t
                    }
                    function l() {}
                    var u, h, m = t.exports = {};
                    !function() {
                        try {
                            u = "function" == typeof setTimeout ? setTimeout : n
                        } catch (e) {
                            u = n
                        }
                        try {
                            h = "function" == typeof clearTimeout ? clearTimeout : i
                        } catch (e) {
                            h = i
                        }
                    }();
                    var d, f = [], p = !1, g = -1;
                    m.nextTick = function(e) {
                        var t = new Array(arguments.length - 1);
                        if (arguments.length > 1)
                            for (var s = 1; s < arguments.length; s++)
                                t[s - 1] = arguments[s];
                        f.push(new c(e,t)),
                        1 !== f.length || p || o(a)
                    }
                    ,
                    c.prototype.run = function() {
                        this.fun.apply(null, this.array)
                    }
                    ,
                    m.title = "browser",
                    m.browser = !0,
                    m.env = {},
                    m.argv = [],
                    m.version = "",
                    m.versions = {},
                    m.on = l,
                    m.addListener = l,
                    m.once = l,
                    m.off = l,
                    m.removeListener = l,
                    m.removeAllListeners = l,
                    m.emit = l,
                    m.prependListener = l,
                    m.prependOnceListener = l,
                    m.listeners = function(e) {
                        return []
                    }
                    ,
                    m.binding = function(e) {
                        throw new Error("process.binding is not supported")
                    }
                    ,
                    m.cwd = function() {
                        return "/"
                    }
                    ,
                    m.chdir = function(e) {
                        throw new Error("process.chdir is not supported")
                    }
                    ,
                    m.umask = function() {
                        return 0
                    }
                }
                , {}]
            }, {}, [1])
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {}]
}, {}, [1]);
