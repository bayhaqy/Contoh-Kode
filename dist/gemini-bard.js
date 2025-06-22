! function() {
    "use strict";
    const e = ["user", "model", "function", "system"];
    var t, n, r, s, i, o, a, l;
    ! function(e) {
        e.HARM_CATEGORY_UNSPECIFIED = "HARM_CATEGORY_UNSPECIFIED", e.HARM_CATEGORY_HATE_SPEECH = "HARM_CATEGORY_HATE_SPEECH", e
            .HARM_CATEGORY_SEXUALLY_EXPLICIT = "HARM_CATEGORY_SEXUALLY_EXPLICIT", e.HARM_CATEGORY_HARASSMENT = "HARM_CATEGORY_HARASSMENT", e
            .HARM_CATEGORY_DANGEROUS_CONTENT = "HARM_CATEGORY_DANGEROUS_CONTENT"
    }(t || (t = {})),
    function(e) {
        e.HARM_BLOCK_THRESHOLD_UNSPECIFIED = "HARM_BLOCK_THRESHOLD_UNSPECIFIED", e.BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE", e.BLOCK_MEDIUM_AND_ABOVE =
            "BLOCK_MEDIUM_AND_ABOVE", e.BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH", e.BLOCK_NONE = "BLOCK_NONE"
    }(n || (n = {})),
    function(e) {
        e.HARM_PROBABILITY_UNSPECIFIED = "HARM_PROBABILITY_UNSPECIFIED", e.NEGLIGIBLE = "NEGLIGIBLE", e.LOW = "LOW", e.MEDIUM = "MEDIUM", e.HIGH = "HIGH"
    }(r || (r = {})),
    function(e) {
        e.BLOCKED_REASON_UNSPECIFIED = "BLOCKED_REASON_UNSPECIFIED", e.SAFETY = "SAFETY", e.OTHER = "OTHER"
    }(s || (s = {})),
    function(e) {
        e.FINISH_REASON_UNSPECIFIED = "FINISH_REASON_UNSPECIFIED", e.STOP = "STOP", e.MAX_TOKENS = "MAX_TOKENS", e.SAFETY = "SAFETY", e.RECITATION =
            "RECITATION", e.OTHER = "OTHER"
    }(i || (i = {})),
    function(e) {
        e.TASK_TYPE_UNSPECIFIED = "TASK_TYPE_UNSPECIFIED", e.RETRIEVAL_QUERY = "RETRIEVAL_QUERY", e.RETRIEVAL_DOCUMENT = "RETRIEVAL_DOCUMENT", e
            .SEMANTIC_SIMILARITY = "SEMANTIC_SIMILARITY", e.CLASSIFICATION = "CLASSIFICATION", e.CLUSTERING = "CLUSTERING"
    }(o || (o = {})),
    function(e) {
        e.MODE_UNSPECIFIED = "MODE_UNSPECIFIED", e.AUTO = "AUTO", e.ANY = "ANY", e.NONE = "NONE"
    }(a || (a = {})),
    function(e) {
        e.STRING = "STRING", e.NUMBER = "NUMBER", e.INTEGER = "INTEGER", e.BOOLEAN = "BOOLEAN", e.ARRAY = "ARRAY", e.OBJECT = "OBJECT"
    }(l || (l = {}));
    class c extends Error {
        constructor(e) {
            super(`[GoogleGenerativeAI Error]: ${e}`)
        }
    }
    class h extends c {
        constructor(e, t) {
            super(e), this.response = t
        }
    }
    class u extends c {
        constructor(e, t, n, r) {
            super(e), this.status = t, this.statusText = n, this.errorDetails = r
        }
    }
    class p extends c {}
    const f = "0.12.0",
        d = "genai-js";
    var g;
    ! function(e) {
        e.GENERATE_CONTENT = "generateContent", e.STREAM_GENERATE_CONTENT = "streamGenerateContent", e.COUNT_TOKENS = "countTokens", e.EMBED_CONTENT =
            "embedContent", e.BATCH_EMBED_CONTENTS = "batchEmbedContents"
    }(g || (g = {}));
    class k {
        constructor(e, t, n, r, s) {
            this.model = e, this.task = t, this.apiKey = n, this.stream = r, this.requestOptions = s
        }
        toString() {
            var e, t;
            const n = (null === (e = this.requestOptions) || void 0 === e ? void 0 : e.apiVersion) || "v1beta";
            let r =
                `${(null===(t=this.requestOptions)||void 0===t?void 0:t.baseUrl)||"https://generativelanguage.googleapis.com"}/${n}/${this.model}:${this.task}`;
            return this.stream && (r += "?alt=sse"), r
        }
    }
    async function m(e) {
        const t = new Headers;
        t.append("Content-Type", "application/json"), t.append("x-goog-api-client", function(e) {
            const t = [];
            return (null == e ? void 0 : e.apiClient) && t.push(e.apiClient), t.push(`${d}/${f}`), t.join(" ")
        }(e.requestOptions)), t.append("x-goog-api-key", e.apiKey);
        let n = e.requestOptions.customHeaders;
        if (n) {
            if (!(n instanceof Headers)) try {
                n = new Headers(n)
            } catch (e) {
                throw new p(`unable to convert customHeaders value ${JSON.stringify(n)} to Headers: ${e.message}`)
            }
            for (const [e, r] of n.entries()) {
                if ("x-goog-api-key" === e) throw new p(`Cannot set reserved header name ${e}`);
                if ("x-goog-api-client" === e) throw new p(`Header name ${e} can only be set using the apiClient field`);
                t.append(e, r)
            }
        }
        return t
    }
    async function y(e, t, n, r, s, i) {
        return async function(e, t, n, r, s, i, o = fetch) {
            const a = new k(e, t, n, r, i);
            let l;
            try {
                const c = await async function(e, t, n, r, s, i) {
                    const o = new k(e, t, n, r, i);
                    return {
                        url: o.toString(),
                        fetchOptions: Object.assign(Object.assign({}, x(i)), {
                            method: "POST",
                            headers: await m(o),
                            body: s
                        })
                    }
                }(e, t, n, r, s, i);
                if (l = await o(c.url, c.fetchOptions), !l.ok) {
                    let e, t = "";
                    try {
                        const n = await l.json();
                        t = n.error.message, n.error.details && (t += ` ${JSON.stringify(n.error.details)}`, e = n.error.details)
                    } catch (e) {}
                    throw new u(`Error fetching from ${a.toString()}: [${l.status} ${l.statusText}] ${t}`, l.status, l.statusText, e)
                }
            } catch (e) {
                let t = e;
                throw e instanceof u || e instanceof p || (t = new c(`Error fetching from ${a.toString()}: ${e.message}`), t.stack = e.stack), t
            }
            return l
        }(e, t, n, r, s, i, fetch)
    }

    function x(e) {
        const t = {};
        if ((null == e ? void 0 : e.timeout) >= 0) {
            const n = new AbortController,
                r = n.signal;
            setTimeout((() => n.abort()), e.timeout), t.signal = r
        }
        return t
    }

    function w(e) {
        return e.text = () => {
            if (e.candidates && e.candidates.length > 0) {
                if (e.candidates.length > 1 && console.warn(
                        `This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`
                        ), _(e.candidates[0])) throw new h(`${E(e)}`, e);
                return function(e) {
                    var t, n, r, s;
                    const i = [];
                    if (null === (n = null === (t = e.candidates) || void 0 === t ? void 0 : t[0].content) || void 0 === n ? void 0 : n.parts)
                        for (const t of null === (s = null === (r = e.candidates) || void 0 === r ? void 0 : r[0].content) || void 0 === s ? void 0 : s
                                .parts) t.text && i.push(t.text);
                    return i.length > 0 ? i.join("") : ""
                }(e)
            }
            if (e.promptFeedback) throw new h(`Text not available. ${E(e)}`, e);
            return ""
        }, e.functionCall = () => {
            if (e.candidates && e.candidates.length > 0) {
                if (e.candidates.length > 1 && console.warn(
                        `This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`
                        ), _(e.candidates[0])) throw new h(`${E(e)}`, e);
                return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."), b(e)[0]
            }
            if (e.promptFeedback) throw new h(`Function call not available. ${E(e)}`, e)
        }, e.functionCalls = () => {
            if (e.candidates && e.candidates.length > 0) {
                if (e.candidates.length > 1 && console.warn(
                        `This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`
                        ), _(e.candidates[0])) throw new h(`${E(e)}`, e);
                return b(e)
            }
            if (e.promptFeedback) throw new h(`Function call not available. ${E(e)}`, e)
        }, e
    }

    function b(e) {
        var t, n, r, s;
        const i = [];
        if (null === (n = null === (t = e.candidates) || void 0 === t ? void 0 : t[0].content) || void 0 === n ? void 0 : n.parts)
            for (const t of null === (s = null === (r = e.candidates) || void 0 === r ? void 0 : r[0].content) || void 0 === s ? void 0 : s.parts) t
                .functionCall && i.push(t.functionCall);
        return i.length > 0 ? i : void 0
    }
    const v = [i.RECITATION, i.SAFETY];

    function _(e) {
        return !!e.finishReason && v.includes(e.finishReason)
    }

    function E(e) {
        var t, n, r;
        let s = "";
        if (e.candidates && 0 !== e.candidates.length || !e.promptFeedback) {
            if (null === (r = e.candidates) || void 0 === r ? void 0 : r[0]) {
                const t = e.candidates[0];
                _(t) && (s += `Candidate was blocked due to ${t.finishReason}`, t.finishMessage && (s += `: ${t.finishMessage}`))
            }
        } else s += "Response was blocked", (null === (t = e.promptFeedback) || void 0 === t ? void 0 : t.blockReason) && (s +=
            ` due to ${e.promptFeedback.blockReason}`), (null === (n = e.promptFeedback) || void 0 === n ? void 0 : n.blockReasonMessage) && (s +=
            `: ${e.promptFeedback.blockReasonMessage}`);
        return s
    }

    function S(e) {
        return this instanceof S ? (this.v = e, this) : new S(e)
    }

    function T(e, t, n) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var r, s = n.apply(e, t || []),
            i = [];
        return r = {}, o("next"), o("throw"), o("return"), r[Symbol.asyncIterator] = function() {
            return this
        }, r;

        function o(e) {
            s[e] && (r[e] = function(t) {
                return new Promise((function(n, r) {
                    i.push([e, t, n, r]) > 1 || a(e, t)
                }))
            })
        }

        function a(e, t) {
            try {
                (n = s[e](t)).value instanceof S ? Promise.resolve(n.value.v).then(l, c) : h(i[0][2], n)
            } catch (e) {
                h(i[0][3], e)
            }
            var n
        }

        function l(e) {
            a("next", e)
        }

        function c(e) {
            a("throw", e)
        }

        function h(e, t) {
            e(t), i.shift(), i.length && a(i[0][0], i[0][1])
        }
    }
    "function" == typeof SuppressedError && SuppressedError;
    const C = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;

    function A(e) {
        const t = function(e) {
                const t = e.getReader();
                return new ReadableStream({
                    start(e) {
                        let n = "";
                        return r();

                        function r() {
                            return t.read().then((({
                                value: t,
                                done: s
                            }) => {
                                if (s) return n.trim() ? void e.error(new c("Failed to parse stream")) : void e.close();
                                n += t;
                                let i, o = n.match(C);
                                for (; o;) {
                                    try {
                                        i = JSON.parse(o[1])
                                    } catch (t) {
                                        return void e.error(new c(`Error parsing JSON response: "${o[1]}"`))
                                    }
                                    e.enqueue(i), n = n.substring(o[0].length), o = n.match(C)
                                }
                                return r()
                            }))
                        }
                    }
                })
            }(e.body.pipeThrough(new TextDecoderStream("utf8", {
                fatal: !0
            }))),
            [n, r] = t.tee();
        return {
            stream: R(n),
            response: O(r)
        }
    }
    async function O(e) {
        const t = [],
            n = e.getReader();
        for (;;) {
            const {
                done: e,
                value: r
            } = await n.read();
            if (e) return w(I(t));
            t.push(r)
        }
    }

    function R(e) {
        return T(this, arguments, (function*() {
            const t = e.getReader();
            for (;;) {
                const {
                    value: e,
                    done: n
                } = yield S(t.read());
                if (n) break;
                yield yield S(w(e))
            }
        }))
    }

    function I(e) {
        const t = e[e.length - 1],
            n = {
                promptFeedback: null == t ? void 0 : t.promptFeedback
            };
        for (const t of e)
            if (t.candidates)
                for (const e of t.candidates) {
                    const t = e.index;
                    if (n.candidates || (n.candidates = []), n.candidates[t] || (n.candidates[t] = {
                            index: e.index
                        }), n.candidates[t].citationMetadata = e.citationMetadata, n.candidates[t].finishReason = e.finishReason, n.candidates[t]
                        .finishMessage = e.finishMessage, n.candidates[t].safetyRatings = e.safetyRatings, e.content && e.content.parts) {
                        n.candidates[t].content || (n.candidates[t].content = {
                            role: e.content.role || "user",
                            parts: []
                        });
                        const r = {};
                        for (const s of e.content.parts) s.text && (r.text = s.text), s.functionCall && (r.functionCall = s.functionCall), 0 === Object.keys(r)
                            .length && (r.text = ""), n.candidates[t].content.parts.push(r)
                    }
                }
        return n
    }
    async function $(e, t, n, r) {
        return A(await y(t, g.STREAM_GENERATE_CONTENT, e, !0, JSON.stringify(n), r))
    }
    async function N(e, t, n, r) {
        const s = await y(t, g.GENERATE_CONTENT, e, !1, JSON.stringify(n), r);
        return {
            response: w(await s.json())
        }
    }

    function z(e) {
        if (null != e) return "string" == typeof e ? {
            role: "system",
            parts: [{
                text: e
            }]
        } : e.text ? {
            role: "system",
            parts: [e]
        } : e.parts ? e.role ? e : {
            role: "system",
            parts: e.parts
        } : void 0
    }

    function L(e) {
        let t = [];
        if ("string" == typeof e) t = [{
            text: e
        }];
        else
            for (const n of e) "string" == typeof n ? t.push({
                text: n
            }) : t.push(n);
        return function(e) {
            const t = {
                    role: "user",
                    parts: []
                },
                n = {
                    role: "function",
                    parts: []
                };
            let r = !1,
                s = !1;
            for (const i of e) "functionResponse" in i ? (n.parts.push(i), s = !0) : (t.parts.push(i), r = !0);
            if (r && s) throw new c(
                "Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");
            if (!r && !s) throw new c("No content is provided for sending chat message.");
            if (r) return t;
            return n
        }(t)
    }

    function B(e) {
        let t;
        if (e.contents) t = e;
        else {
            t = {
                contents: [L(e)]
            }
        }
        return e.systemInstruction && (t.systemInstruction = z(e.systemInstruction)), t
    }
    const M = ["text", "inlineData", "functionCall", "functionResponse"],
        H = {
            user: ["text", "inlineData"],
            function: ["functionResponse"],
            model: ["text", "functionCall"],
            system: ["text"]
        };
    const D = "SILENT_ERROR";
    class P {
        constructor(t, n, r, s) {
            this.model = n, this.params = r, this.requestOptions = s, this._history = [], this._sendPromise = Promise.resolve(), this._apiKey = t, (null ==
                r ? void 0 : r.history) && (! function(t) {
                let n = !1;
                for (const r of t) {
                    const {
                        role: t,
                        parts: s
                    } = r;
                    if (!n && "user" !== t) throw new c(`First content should be with role 'user', got ${t}`);
                    if (!e.includes(t)) throw new c(`Each item should include role field. Got ${t} but valid roles are: ${JSON.stringify(e)}`);
                    if (!Array.isArray(s)) throw new c("Content should have 'parts' property with an array of Parts");
                    if (0 === s.length) throw new c("Each Content should have at least one part");
                    const i = {
                        text: 0,
                        inlineData: 0,
                        functionCall: 0,
                        functionResponse: 0,
                        fileData: 0
                    };
                    for (const e of s)
                        for (const t of M) t in e && (i[t] += 1);
                    const o = H[t];
                    for (const e of M)
                        if (!o.includes(e) && i[e] > 0) throw new c(`Content with role '${t}' can't contain '${e}' part`);
                    n = !0
                }
            }(r.history), this._history = r.history)
        }
        async getHistory() {
            return await this._sendPromise, this._history
        }
        async sendMessage(e) {
            var t, n, r, s, i;
            await this._sendPromise;
            const o = L(e),
                a = {
                    safetySettings: null === (t = this.params) || void 0 === t ? void 0 : t.safetySettings,
                    generationConfig: null === (n = this.params) || void 0 === n ? void 0 : n.generationConfig,
                    tools: null === (r = this.params) || void 0 === r ? void 0 : r.tools,
                    toolConfig: null === (s = this.params) || void 0 === s ? void 0 : s.toolConfig,
                    systemInstruction: null === (i = this.params) || void 0 === i ? void 0 : i.systemInstruction,
                    contents: [...this._history, o]
                };
            let l;
            return this._sendPromise = this._sendPromise.then((() => N(this._apiKey, this.model, a, this.requestOptions))).then((e => {
                var t;
                if (e.response.candidates && e.response.candidates.length > 0) {
                    this._history.push(o);
                    const n = Object.assign({
                        parts: [],
                        role: "model"
                    }, null === (t = e.response.candidates) || void 0 === t ? void 0 : t[0].content);
                    this._history.push(n)
                } else {
                    const t = E(e.response);
                    t && console.warn(`sendMessage() was unsuccessful. ${t}. Inspect response object for details.`)
                }
                l = e
            })), await this._sendPromise, l
        }
        async sendMessageStream(e) {
            var t, n, r, s, i;
            await this._sendPromise;
            const o = L(e),
                a = {
                    safetySettings: null === (t = this.params) || void 0 === t ? void 0 : t.safetySettings,
                    generationConfig: null === (n = this.params) || void 0 === n ? void 0 : n.generationConfig,
                    tools: null === (r = this.params) || void 0 === r ? void 0 : r.tools,
                    toolConfig: null === (s = this.params) || void 0 === s ? void 0 : s.toolConfig,
                    systemInstruction: null === (i = this.params) || void 0 === i ? void 0 : i.systemInstruction,
                    contents: [...this._history, o]
                },
                l = $(this._apiKey, this.model, a, this.requestOptions);
            return this._sendPromise = this._sendPromise.then((() => l)).catch((e => {
                throw new Error(D)
            })).then((e => e.response)).then((e => {
                if (e.candidates && e.candidates.length > 0) {
                    this._history.push(o);
                    const t = Object.assign({}, e.candidates[0].content);
                    t.role || (t.role = "model"), this._history.push(t)
                } else {
                    const t = E(e);
                    t && console.warn(`sendMessageStream() was unsuccessful. ${t}. Inspect response object for details.`)
                }
            })).catch((e => {
                e.message !== D && console.error(e)
            })), l
        }
    }
    class F {
        constructor(e, t, n) {
            this.apiKey = e, t.model.includes("/") ? this.model = t.model : this.model = `models/${t.model}`, this.generationConfig = t.generationConfig ||
            {}, this.safetySettings = t.safetySettings || [], this.tools = t.tools, this.toolConfig = t.toolConfig, this.systemInstruction = z(t
                .systemInstruction), this.requestOptions = n || {}
        }
        async generateContent(e) {
            const t = B(e);
            return N(this.apiKey, this.model, Object.assign({
                generationConfig: this.generationConfig,
                safetySettings: this.safetySettings,
                tools: this.tools,
                toolConfig: this.toolConfig,
                systemInstruction: this.systemInstruction
            }, t), this.requestOptions)
        }
        async generateContentStream(e) {
            const t = B(e);
            return $(this.apiKey, this.model, Object.assign({
                generationConfig: this.generationConfig,
                safetySettings: this.safetySettings,
                tools: this.tools,
                toolConfig: this.toolConfig,
                systemInstruction: this.systemInstruction
            }, t), this.requestOptions)
        }
        startChat(e) {
            return new P(this.apiKey, this.model, Object.assign({
                generationConfig: this.generationConfig,
                safetySettings: this.safetySettings,
                tools: this.tools,
                toolConfig: this.toolConfig,
                systemInstruction: this.systemInstruction
            }, e), this.requestOptions)
        }
        async countTokens(e) {
            const t = B(e);
            return async function(e, t, n, r) {
                return (await y(t, g.COUNT_TOKENS, e, !1, JSON.stringify(Object.assign(Object.assign({}, n), {
                    model: t
                })), r)).json()
            }(this.apiKey, this.model, t, this.requestOptions)
        }
        async embedContent(e) {
            const t = function(e) {
                if ("string" == typeof e || Array.isArray(e)) return {
                    content: L(e)
                };
                return e
            }(e);
            return async function(e, t, n, r) {
                return (await y(t, g.EMBED_CONTENT, e, !1, JSON.stringify(n), r)).json()
            }(this.apiKey, this.model, t, this.requestOptions)
        }
        async batchEmbedContents(e) {
            return async function(e, t, n, r) {
                const s = n.requests.map((e => Object.assign(Object.assign({}, e), {
                    model: t
                })));
                return (await y(t, g.BATCH_EMBED_CONTENTS, e, !1, JSON.stringify({
                    requests: s
                }), r)).json()
            }(this.apiKey, this.model, e, this.requestOptions)
        }
    }
    class j {
        constructor(e) {
            this.apiKey = e
        }
        getGenerativeModel(e, t) {
            if (!e.model) throw new c("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");
            return new F(this.apiKey, e, t)
        }
    }

    function q() {
        return {
            async: !1,
            breaks: !1,
            extensions: null,
            gfm: !0,
            hooks: null,
            pedantic: !1,
            renderer: null,
            silent: !1,
            tokenizer: null,
            walkTokens: null
        }
    }
    let U = {
        async: !1,
        breaks: !1,
        extensions: null,
        gfm: !0,
        hooks: null,
        pedantic: !1,
        renderer: null,
        silent: !1,
        tokenizer: null,
        walkTokens: null
    };

    function G(e) {
        U = e
    }
    const K = /[&<>"']/,
        Y = new RegExp(K.source, "g"),
        Z = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
        Q = new RegExp(Z.source, "g"),
        X = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        },
        V = e => X[e];

    function J(e, t) {
        if (t) {
            if (K.test(e)) return e.replace(Y, V)
        } else if (Z.test(e)) return e.replace(Q, V);
        return e
    }
    const W = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;

    function ee(e) {
        return e.replace(W, ((e, t) => "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t
            .substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""))
    }
    const te = /(^|[^\[])\^/g;

    function ne(e, t) {
        let n = "string" == typeof e ? e : e.source;
        t = t || "";
        const r = {
            replace: (e, t) => {
                let s = "string" == typeof t ? t : t.source;
                return s = s.replace(te, "$1"), n = n.replace(e, s), r
            },
            getRegex: () => new RegExp(n, t)
        };
        return r
    }

    function re(e) {
        try {
            e = encodeURI(e).replace(/%25/g, "%")
        } catch (e) {
            return null
        }
        return e
    }
    const se = {
        exec: () => null
    };

    function ie(e, t) {
        const n = e.replace(/\|/g, ((e, t, n) => {
            let r = !1,
                s = t;
            for (; --s >= 0 && "\\" === n[s];) r = !r;
            return r ? "|" : " |"
        })).split(/ \|/);
        let r = 0;
        if (n[0].trim() || n.shift(), n.length > 0 && !n[n.length - 1].trim() && n.pop(), t)
            if (n.length > t) n.splice(t);
            else
                for (; n.length < t;) n.push("");
        for (; r < n.length; r++) n[r] = n[r].trim().replace(/\\\|/g, "|");
        return n
    }

    function oe(e, t, n) {
        const r = e.length;
        if (0 === r) return "";
        let s = 0;
        for (; s < r;) {
            const i = e.charAt(r - s - 1);
            if (i !== t || n) {
                if (i === t || !n) break;
                s++
            } else s++
        }
        return e.slice(0, r - s)
    }

    function ae(e, t, n, r) {
        const s = t.href,
            i = t.title ? J(t.title) : null,
            o = e[1].replace(/\\([\[\]])/g, "$1");
        if ("!" !== e[0].charAt(0)) {
            r.state.inLink = !0;
            const e = {
                type: "link",
                raw: n,
                href: s,
                title: i,
                text: o,
                tokens: r.inlineTokens(o)
            };
            return r.state.inLink = !1, e
        }
        return {
            type: "image",
            raw: n,
            href: s,
            title: i,
            text: J(o)
        }
    }
    class le {
        options;
        rules;
        lexer;
        constructor(e) {
            this.options = e || U
        }
        space(e) {
            const t = this.rules.block.newline.exec(e);
            if (t && t[0].length > 0) return {
                type: "space",
                raw: t[0]
            }
        }
        code(e) {
            const t = this.rules.block.code.exec(e);
            if (t) {
                const e = t[0].replace(/^ {1,4}/gm, "");
                return {
                    type: "code",
                    raw: t[0],
                    codeBlockStyle: "indented",
                    text: this.options.pedantic ? e : oe(e, "\n")
                }
            }
        }
        fences(e) {
            const t = this.rules.block.fences.exec(e);
            if (t) {
                const e = t[0],
                    n = function(e, t) {
                        const n = e.match(/^(\s+)(?:```)/);
                        if (null === n) return t;
                        const r = n[1];
                        return t.split("\n").map((e => {
                            const t = e.match(/^\s+/);
                            if (null === t) return e;
                            const [n] = t;
                            return n.length >= r.length ? e.slice(r.length) : e
                        })).join("\n")
                    }(e, t[3] || "");
                return {
                    type: "code",
                    raw: e,
                    lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
                    text: n
                }
            }
        }
        heading(e) {
            const t = this.rules.block.heading.exec(e);
            if (t) {
                let e = t[2].trim();
                if (/#$/.test(e)) {
                    const t = oe(e, "#");
                    this.options.pedantic ? e = t.trim() : t && !/ $/.test(t) || (e = t.trim())
                }
                return {
                    type: "heading",
                    raw: t[0],
                    depth: t[1].length,
                    text: e,
                    tokens: this.lexer.inline(e)
                }
            }
        }
        hr(e) {
            const t = this.rules.block.hr.exec(e);
            if (t) return {
                type: "hr",
                raw: t[0]
            }
        }
        blockquote(e) {
            const t = this.rules.block.blockquote.exec(e);
            if (t) {
                let e = t[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, "\n    $1");
                e = oe(e.replace(/^ *>[ \t]?/gm, ""), "\n");
                const n = this.lexer.state.top;
                this.lexer.state.top = !0;
                const r = this.lexer.blockTokens(e);
                return this.lexer.state.top = n, {
                    type: "blockquote",
                    raw: t[0],
                    tokens: r,
                    text: e
                }
            }
        }
        list(e) {
            let t = this.rules.block.list.exec(e);
            if (t) {
                let n = t[1].trim();
                const r = n.length > 1,
                    s = {
                        type: "list",
                        raw: "",
                        ordered: r,
                        start: r ? +n.slice(0, -1) : "",
                        loose: !1,
                        items: []
                    };
                n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
                const i = new RegExp(`^( {0,3}${n})((?:[\t ][^\\n]*)?(?:\\n|$))`);
                let o = "",
                    a = "",
                    l = !1;
                for (; e;) {
                    let n = !1;
                    if (!(t = i.exec(e))) break;
                    if (this.rules.block.hr.test(e)) break;
                    o = t[0], e = e.substring(o.length);
                    let r = t[2].split("\n", 1)[0].replace(/^\t+/, (e => " ".repeat(3 * e.length))),
                        c = e.split("\n", 1)[0],
                        h = 0;
                    this.options.pedantic ? (h = 2, a = r.trimStart()) : (h = t[2].search(/[^ ]/), h = h > 4 ? 1 : h, a = r.slice(h), h += t[1].length);
                    let u = !1;
                    if (!r && /^ *$/.test(c) && (o += c + "\n", e = e.substring(c.length + 1), n = !0), !n) {
                        const t = new RegExp(`^ {0,${Math.min(3,h-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),
                            n = new RegExp(`^ {0,${Math.min(3,h-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
                            s = new RegExp(`^ {0,${Math.min(3,h-1)}}(?:\`\`\`|~~~)`),
                            i = new RegExp(`^ {0,${Math.min(3,h-1)}}#`);
                        for (; e;) {
                            const l = e.split("\n", 1)[0];
                            if (c = l, this.options.pedantic && (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), s.test(c)) break;
                            if (i.test(c)) break;
                            if (t.test(c)) break;
                            if (n.test(e)) break;
                            if (c.search(/[^ ]/) >= h || !c.trim()) a += "\n" + c.slice(h);
                            else {
                                if (u) break;
                                if (r.search(/[^ ]/) >= 4) break;
                                if (s.test(r)) break;
                                if (i.test(r)) break;
                                if (n.test(r)) break;
                                a += "\n" + c
                            }
                            u || c.trim() || (u = !0), o += l + "\n", e = e.substring(l.length + 1), r = c.slice(h)
                        }
                    }
                    s.loose || (l ? s.loose = !0 : /\n *\n *$/.test(o) && (l = !0));
                    let p, f = null;
                    this.options.gfm && (f = /^\[[ xX]\] /.exec(a), f && (p = "[ ] " !== f[0], a = a.replace(/^\[[ xX]\] +/, ""))), s.items.push({
                        type: "list_item",
                        raw: o,
                        task: !!f,
                        checked: p,
                        loose: !1,
                        text: a,
                        tokens: []
                    }), s.raw += o
                }
                s.items[s.items.length - 1].raw = o.trimEnd(), s.items[s.items.length - 1].text = a.trimEnd(), s.raw = s.raw.trimEnd();
                for (let e = 0; e < s.items.length; e++)
                    if (this.lexer.state.top = !1, s.items[e].tokens = this.lexer.blockTokens(s.items[e].text, []), !s.loose) {
                        const t = s.items[e].tokens.filter((e => "space" === e.type)),
                            n = t.length > 0 && t.some((e => /\n.*\n/.test(e.raw)));
                        s.loose = n
                    } if (s.loose)
                    for (let e = 0; e < s.items.length; e++) s.items[e].loose = !0;
                return s
            }
        }
        html(e) {
            const t = this.rules.block.html.exec(e);
            if (t) {
                return {
                    type: "html",
                    block: !0,
                    raw: t[0],
                    pre: "pre" === t[1] || "script" === t[1] || "style" === t[1],
                    text: t[0]
                }
            }
        }
        def(e) {
            const t = this.rules.block.def.exec(e);
            if (t) {
                const e = t[1].toLowerCase().replace(/\s+/g, " "),
                    n = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "",
                    r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
                return {
                    type: "def",
                    tag: e,
                    raw: t[0],
                    href: n,
                    title: r
                }
            }
        }
        table(e) {
            const t = this.rules.block.table.exec(e);
            if (!t) return;
            if (!/[:|]/.test(t[2])) return;
            const n = ie(t[1]),
                r = t[2].replace(/^\||\| *$/g, "").split("|"),
                s = t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split("\n") : [],
                i = {
                    type: "table",
                    raw: t[0],
                    header: [],
                    align: [],
                    rows: []
                };
            if (n.length === r.length) {
                for (const e of r) /^ *-+: *$/.test(e) ? i.align.push("right") : /^ *:-+: *$/.test(e) ? i.align.push("center") : /^ *:-+ *$/.test(e) ? i
                    .align.push("left") : i.align.push(null);
                for (const e of n) i.header.push({
                    text: e,
                    tokens: this.lexer.inline(e)
                });
                for (const e of s) i.rows.push(ie(e, i.header.length).map((e => ({
                    text: e,
                    tokens: this.lexer.inline(e)
                }))));
                return i
            }
        }
        lheading(e) {
            const t = this.rules.block.lheading.exec(e);
            if (t) return {
                type: "heading",
                raw: t[0],
                depth: "=" === t[2].charAt(0) ? 1 : 2,
                text: t[1],
                tokens: this.lexer.inline(t[1])
            }
        }
        paragraph(e) {
            const t = this.rules.block.paragraph.exec(e);
            if (t) {
                const e = "\n" === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1];
                return {
                    type: "paragraph",
                    raw: t[0],
                    text: e,
                    tokens: this.lexer.inline(e)
                }
            }
        }
        text(e) {
            const t = this.rules.block.text.exec(e);
            if (t) return {
                type: "text",
                raw: t[0],
                text: t[0],
                tokens: this.lexer.inline(t[0])
            }
        }
        escape(e) {
            const t = this.rules.inline.escape.exec(e);
            if (t) return {
                type: "escape",
                raw: t[0],
                text: J(t[1])
            }
        }
        tag(e) {
            const t = this.rules.inline.tag.exec(e);
            if (t) return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) &&
                (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state
                .inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
                    type: "html",
                    raw: t[0],
                    inLink: this.lexer.state.inLink,
                    inRawBlock: this.lexer.state.inRawBlock,
                    block: !1,
                    text: t[0]
                }
        }
        link(e) {
            const t = this.rules.inline.link.exec(e);
            if (t) {
                const e = t[2].trim();
                if (!this.options.pedantic && /^</.test(e)) {
                    if (!/>$/.test(e)) return;
                    const t = oe(e.slice(0, -1), "\\");
                    if ((e.length - t.length) % 2 == 0) return
                } else {
                    const e = function(e, t) {
                        if (-1 === e.indexOf(t[1])) return -1;
                        let n = 0;
                        for (let r = 0; r < e.length; r++)
                            if ("\\" === e[r]) r++;
                            else if (e[r] === t[0]) n++;
                        else if (e[r] === t[1] && (n--, n < 0)) return r;
                        return -1
                    }(t[2], "()");
                    if (e > -1) {
                        const n = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + e;
                        t[2] = t[2].substring(0, e), t[0] = t[0].substring(0, n).trim(), t[3] = ""
                    }
                }
                let n = t[2],
                    r = "";
                if (this.options.pedantic) {
                    const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);
                    e && (n = e[1], r = e[3])
                } else r = t[3] ? t[3].slice(1, -1) : "";
                return n = n.trim(), /^</.test(n) && (n = this.options.pedantic && !/>$/.test(e) ? n.slice(1) : n.slice(1, -1)), ae(t, {
                    href: n ? n.replace(this.rules.inline.anyPunctuation, "$1") : n,
                    title: r ? r.replace(this.rules.inline.anyPunctuation, "$1") : r
                }, t[0], this.lexer)
            }
        }
        reflink(e, t) {
            let n;
            if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
                const e = t[(n[2] || n[1]).replace(/\s+/g, " ").toLowerCase()];
                if (!e) {
                    const e = n[0].charAt(0);
                    return {
                        type: "text",
                        raw: e,
                        text: e
                    }
                }
                return ae(n, e, n[0], this.lexer)
            }
        }
        emStrong(e, t, n = "") {
            let r = this.rules.inline.emStrongLDelim.exec(e);
            if (!r) return;
            if (r[3] && n.match(/[\p{L}\p{N}]/u)) return;
            if (!(r[1] || r[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
                const n = [...r[0]].length - 1;
                let s, i, o = n,
                    a = 0;
                const l = "*" === r[0][0] ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
                for (l.lastIndex = 0, t = t.slice(-1 * e.length + n); null != (r = l.exec(t));) {
                    if (s = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !s) continue;
                    if (i = [...s].length, r[3] || r[4]) {
                        o += i;
                        continue
                    }
                    if ((r[5] || r[6]) && n % 3 && !((n + i) % 3)) {
                        a += i;
                        continue
                    }
                    if (o -= i, o > 0) continue;
                    i = Math.min(i, i + o + a);
                    const t = [...r[0]][0].length,
                        l = e.slice(0, n + r.index + t + i);
                    if (Math.min(n, i) % 2) {
                        const e = l.slice(1, -1);
                        return {
                            type: "em",
                            raw: l,
                            text: e,
                            tokens: this.lexer.inlineTokens(e)
                        }
                    }
                    const c = l.slice(2, -2);
                    return {
                        type: "strong",
                        raw: l,
                        text: c,
                        tokens: this.lexer.inlineTokens(c)
                    }
                }
            }
        }
        codespan(e) {
            const t = this.rules.inline.code.exec(e);
            if (t) {
                let e = t[2].replace(/\n/g, " ");
                const n = /[^ ]/.test(e),
                    r = /^ /.test(e) && / $/.test(e);
                return n && r && (e = e.substring(1, e.length - 1)), e = J(e, !0), {
                    type: "codespan",
                    raw: t[0],
                    text: e
                }
            }
        }
        br(e) {
            const t = this.rules.inline.br.exec(e);
            if (t) return {
                type: "br",
                raw: t[0]
            }
        }
        del(e) {
            const t = this.rules.inline.del.exec(e);
            if (t) return {
                type: "del",
                raw: t[0],
                text: t[2],
                tokens: this.lexer.inlineTokens(t[2])
            }
        }
        autolink(e) {
            const t = this.rules.inline.autolink.exec(e);
            if (t) {
                let e, n;
                return "@" === t[2] ? (e = J(t[1]), n = "mailto:" + e) : (e = J(t[1]), n = e), {
                    type: "link",
                    raw: t[0],
                    text: e,
                    href: n,
                    tokens: [{
                        type: "text",
                        raw: e,
                        text: e
                    }]
                }
            }
        }
        url(e) {
            let t;
            if (t = this.rules.inline.url.exec(e)) {
                let e, n;
                if ("@" === t[2]) e = J(t[0]), n = "mailto:" + e;
                else {
                    let r;
                    do {
                        r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? ""
                    } while (r !== t[0]);
                    e = J(t[0]), n = "www." === t[1] ? "http://" + t[0] : t[0]
                }
                return {
                    type: "link",
                    raw: t[0],
                    text: e,
                    href: n,
                    tokens: [{
                        type: "text",
                        raw: e,
                        text: e
                    }]
                }
            }
        }
        inlineText(e) {
            const t = this.rules.inline.text.exec(e);
            if (t) {
                let e;
                return e = this.lexer.state.inRawBlock ? t[0] : J(t[0]), {
                    type: "text",
                    raw: t[0],
                    text: e
                }
            }
        }
    }
    const ce = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
        he = /(?:[*+-]|\d{1,9}[.)])/,
        ue = ne(
            /^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/
            ).replace(/bull/g, he).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(
            /heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(),
        pe = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
        fe = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
        de = ne(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", fe).replace("title",
            /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),
        ge = ne(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, he).getRegex(),
        ke =
        "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
        me = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
        ye = ne(
            "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
            "i").replace("comment", me).replace("tag", ke).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
        .getRegex(),
        xe = ne(pe).replace("hr", ce).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote",
            " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html",
            "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ke).getRegex(),
        we = {
            blockquote: ne(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", xe).getRegex(),
            code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
            def: de,
            fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
            heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
            hr: ce,
            html: ye,
            lheading: ue,
            list: ge,
            newline: /^(?: *(?:\n|$))+/,
            paragraph: xe,
            table: se,
            text: /^[^\n]+/
        },
        be = ne(
            "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
            ).replace("hr", ce).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences",
            " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html",
            "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ke).getRegex(),
        ve = {
            ...we,
            table: be,
            paragraph: ne(pe).replace("hr", ce).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", be).replace("blockquote",
                " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html",
                "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ke).getRegex()
        },
        _e = {
            ...we,
            html: ne(
                "^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))"
                ).replace("comment", me).replace(/tag/g,
                "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b"
                ).getRegex(),
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
            heading: /^(#{1,6})(.*)(?:\n+|$)/,
            fences: se,
            lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
            paragraph: ne(pe).replace("hr", ce).replace("heading", " *#{1,6} *[^\n]").replace("lheading", ue).replace("|table", "").replace("blockquote",
                " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
        },
        Ee = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        Se = /^( {2,}|\\)\n(?!\s*$)/,
        Te = "\\p{P}\\p{S}",
        Ce = ne(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, Te).getRegex(),
        Ae = ne(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, Te).getRegex(),
        Oe = ne(
            "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])",
            "gu").replace(/punct/g, Te).getRegex(),
        Re = ne(
            "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])",
            "gu").replace(/punct/g, Te).getRegex(),
        Ie = ne(/\\([punct])/, "gu").replace(/punct/g, Te).getRegex(),
        $e = ne(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",
            /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/)
        .getRegex(),
        Ne = ne(me).replace("(?:--\x3e|$)", "--\x3e").getRegex(),
        ze = ne(
            "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
            ).replace("comment", Ne).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),
        Le = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
        Be = ne(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", Le).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",
            /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),
        Me = ne(/^!?\[(label)\]\[(ref)\]/).replace("label", Le).replace("ref", fe).getRegex(),
        He = ne(/^!?\[(ref)\](?:\[\])?/).replace("ref", fe).getRegex(),
        De = {
            _backpedal: se,
            anyPunctuation: Ie,
            autolink: $e,
            blockSkip: /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,
            br: Se,
            code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
            del: se,
            emStrongLDelim: Ae,
            emStrongRDelimAst: Oe,
            emStrongRDelimUnd: Re,
            escape: Ee,
            link: Be,
            nolink: He,
            punctuation: Ce,
            reflink: Me,
            reflinkSearch: ne("reflink|nolink(?!\\()", "g").replace("reflink", Me).replace("nolink", He).getRegex(),
            tag: ze,
            text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
            url: se
        },
        Pe = {
            ...De,
            link: ne(/^!?\[(label)\]\((.*?)\)/).replace("label", Le).getRegex(),
            reflink: ne(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Le).getRegex()
        },
        Fe = {
            ...De,
            escape: ne(Ee).replace("])", "~|])").getRegex(),
            url: ne(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email",
                /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
            _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
            del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
            text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
        },
        je = {
            ...Fe,
            br: ne(Se).replace("{2,}", "*").getRegex(),
            text: ne(Fe.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
        },
        qe = {
            normal: we,
            gfm: ve,
            pedantic: _e
        },
        Ue = {
            normal: De,
            gfm: Fe,
            breaks: je,
            pedantic: Pe
        };
    class Ge {
        tokens;
        options;
        state;
        tokenizer;
        inlineQueue;
        constructor(e) {
            this.tokens = [], this.tokens.links = Object.create(null), this.options = e || U, this.options.tokenizer = this.options.tokenizer || new le,
                this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this
                .state = {
                    inLink: !1,
                    inRawBlock: !1,
                    top: !0
                };
            const t = {
                block: qe.normal,
                inline: Ue.normal
            };
            this.options.pedantic ? (t.block = qe.pedantic, t.inline = Ue.pedantic) : this.options.gfm && (t.block = qe.gfm, this.options.breaks ? t
                .inline = Ue.breaks : t.inline = Ue.gfm), this.tokenizer.rules = t
        }
        static get rules() {
            return {
                block: qe,
                inline: Ue
            }
        }
        static lex(e, t) {
            return new Ge(t).lex(e)
        }
        static lexInline(e, t) {
            return new Ge(t).inlineTokens(e)
        }
        lex(e) {
            e = e.replace(/\r\n|\r/g, "\n"), this.blockTokens(e, this.tokens);
            for (let e = 0; e < this.inlineQueue.length; e++) {
                const t = this.inlineQueue[e];
                this.inlineTokens(t.src, t.tokens)
            }
            return this.inlineQueue = [], this.tokens
        }
        blockTokens(e, t = []) {
            let n, r, s, i;
            for (e = this.options.pedantic ? e.replace(/\t/g, "    ").replace(/^ +$/gm, "") : e.replace(/^( *)(\t+)/gm, ((e, t, n) => t + "    ".repeat(n
                    .length))); e;)
                if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((r => !!(n = r.call({
                        lexer: this
                    }, e, t)) && (e = e.substring(n.raw.length), t.push(n), !0)))))
                    if (n = this.tokenizer.space(e)) e = e.substring(n.raw.length), 1 === n.raw.length && t.length > 0 ? t[t.length - 1].raw += "\n" : t
                        .push(n);
                    else if (n = this.tokenizer.code(e)) e = e.substring(n.raw.length), r = t[t.length - 1], !r || "paragraph" !== r.type && "text" !== r
                .type ? t.push(n) : (r.raw += "\n" + n.raw, r.text += "\n" + n.text, this.inlineQueue[this.inlineQueue.length - 1].src = r.text);
            else if (n = this.tokenizer.fences(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.heading(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.hr(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.blockquote(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.list(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.html(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.def(e)) e = e.substring(n.raw.length), r = t[t.length - 1], !r || "paragraph" !== r.type && "text" !== r.type ? this
                .tokens.links[n.tag] || (this.tokens.links[n.tag] = {
                    href: n.href,
                    title: n.title
                }) : (r.raw += "\n" + n.raw, r.text += "\n" + n.raw, this.inlineQueue[this.inlineQueue.length - 1].src = r.text);
            else if (n = this.tokenizer.table(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.lheading(e)) e = e.substring(n.raw.length), t.push(n);
            else {
                if (s = e, this.options.extensions && this.options.extensions.startBlock) {
                    let t = 1 / 0;
                    const n = e.slice(1);
                    let r;
                    this.options.extensions.startBlock.forEach((e => {
                        r = e.call({
                            lexer: this
                        }, n), "number" == typeof r && r >= 0 && (t = Math.min(t, r))
                    })), t < 1 / 0 && t >= 0 && (s = e.substring(0, t + 1))
                }
                if (this.state.top && (n = this.tokenizer.paragraph(s))) r = t[t.length - 1], i && "paragraph" === r.type ? (r.raw += "\n" + n.raw, r
                        .text += "\n" + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : t.push(n), i = s
                    .length !== e.length, e = e.substring(n.raw.length);
                else if (n = this.tokenizer.text(e)) e = e.substring(n.raw.length), r = t[t.length - 1], r && "text" === r.type ? (r.raw += "\n" + n.raw, r
                    .text += "\n" + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : t.push(n);
                else if (e) {
                    const t = "Infinite loop on byte: " + e.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(t);
                        break
                    }
                    throw new Error(t)
                }
            }
            return this.state.top = !0, t
        }
        inline(e, t = []) {
            return this.inlineQueue.push({
                src: e,
                tokens: t
            }), t
        }
        inlineTokens(e, t = []) {
            let n, r, s, i, o, a, l = e;
            if (this.tokens.links) {
                const e = Object.keys(this.tokens.links);
                if (e.length > 0)
                    for (; null != (i = this.tokenizer.rules.inline.reflinkSearch.exec(l));) e.includes(i[0].slice(i[0].lastIndexOf("[") + 1, -1)) && (l = l
                        .slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
            }
            for (; null != (i = this.tokenizer.rules.inline.blockSkip.exec(l));) l = l.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + l
                .slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
            for (; null != (i = this.tokenizer.rules.inline.anyPunctuation.exec(l));) l = l.slice(0, i.index) + "++" + l.slice(this.tokenizer.rules.inline
                .anyPunctuation.lastIndex);
            for (; e;)
                if (o || (a = ""), o = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((r => !!(n = r
                        .call({
                            lexer: this
                        }, e, t)) && (e = e.substring(n.raw.length), t.push(n), !0)))))
                    if (n = this.tokenizer.escape(e)) e = e.substring(n.raw.length), t.push(n);
                    else if (n = this.tokenizer.tag(e)) e = e.substring(n.raw.length), r = t[t.length - 1], r && "text" === n.type && "text" === r.type ? (r
                .raw += n.raw, r.text += n.text) : t.push(n);
            else if (n = this.tokenizer.link(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.reflink(e, this.tokens.links)) e = e.substring(n.raw.length), r = t[t.length - 1], r && "text" === n.type &&
                "text" === r.type ? (r.raw += n.raw, r.text += n.text) : t.push(n);
            else if (n = this.tokenizer.emStrong(e, l, a)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.codespan(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.br(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.del(e)) e = e.substring(n.raw.length), t.push(n);
            else if (n = this.tokenizer.autolink(e)) e = e.substring(n.raw.length), t.push(n);
            else if (this.state.inLink || !(n = this.tokenizer.url(e))) {
                if (s = e, this.options.extensions && this.options.extensions.startInline) {
                    let t = 1 / 0;
                    const n = e.slice(1);
                    let r;
                    this.options.extensions.startInline.forEach((e => {
                        r = e.call({
                            lexer: this
                        }, n), "number" == typeof r && r >= 0 && (t = Math.min(t, r))
                    })), t < 1 / 0 && t >= 0 && (s = e.substring(0, t + 1))
                }
                if (n = this.tokenizer.inlineText(s)) e = e.substring(n.raw.length), "_" !== n.raw.slice(-1) && (a = n.raw.slice(-1)), o = !0, r = t[t
                    .length - 1], r && "text" === r.type ? (r.raw += n.raw, r.text += n.text) : t.push(n);
                else if (e) {
                    const t = "Infinite loop on byte: " + e.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(t);
                        break
                    }
                    throw new Error(t)
                }
            } else e = e.substring(n.raw.length), t.push(n);
            return t
        }
    }
    class Ke {
        options;
        constructor(e) {
            this.options = e || U
        }
        code(e, t, n) {
            const r = (t || "").match(/^\S*/)?.[0];
            return e = e.replace(/\n$/, "") + "\n", r ? '<pre><code class="language-' + J(r) + '">' + (n ? e : J(e, !0)) + "</code></pre>\n" :
                "<pre><code>" + (n ? e : J(e, !0)) + "</code></pre>\n"
        }
        blockquote(e) {
            return `<blockquote>\n${e}</blockquote>\n`
        }
        html(e, t) {
            return e
        }
        heading(e, t, n) {
            return `<h${t}>${e}</h${t}>\n`
        }
        hr() {
            return "<hr>\n"
        }
        list(e, t, n) {
            const r = t ? "ol" : "ul";
            return "<" + r + (t && 1 !== n ? ' start="' + n + '"' : "") + ">\n" + e + "</" + r + ">\n"
        }
        listitem(e, t, n) {
            return `<li>${e}</li>\n`
        }
        checkbox(e) {
            return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
        }
        paragraph(e) {
            return `<p>${e}</p>\n`
        }
        table(e, t) {
            return t && (t = `<tbody>${t}</tbody>`), "<table>\n<thead>\n" + e + "</thead>\n" + t + "</table>\n"
        }
        tablerow(e) {
            return `<tr>\n${e}</tr>\n`
        }
        tablecell(e, t) {
            const n = t.header ? "th" : "td";
            return (t.align ? `<${n} align="${t.align}">` : `<${n}>`) + e + `</${n}>\n`
        }
        strong(e) {
            return `<strong>${e}</strong>`
        }
        em(e) {
            return `<em>${e}</em>`
        }
        codespan(e) {
            return `<code>${e}</code>`
        }
        br() {
            return "<br>"
        }
        del(e) {
            return `<del>${e}</del>`
        }
        link(e, t, n) {
            const r = re(e);
            if (null === r) return n;
            let s = '<a href="' + (e = r) + '"';
            return t && (s += ' title="' + t + '"'), s += ">" + n + "</a>", s
        }
        image(e, t, n) {
            const r = re(e);
            if (null === r) return n;
            let s = `<img src="${e=r}" alt="${n}"`;
            return t && (s += ` title="${t}"`), s += ">", s
        }
        text(e) {
            return e
        }
    }
    class Ye {
        strong(e) {
            return e
        }
        em(e) {
            return e
        }
        codespan(e) {
            return e
        }
        del(e) {
            return e
        }
        html(e) {
            return e
        }
        text(e) {
            return e
        }
        link(e, t, n) {
            return "" + n
        }
        image(e, t, n) {
            return "" + n
        }
        br() {
            return ""
        }
    }
    class Ze {
        options;
        renderer;
        textRenderer;
        constructor(e) {
            this.options = e || U, this.options.renderer = this.options.renderer || new Ke, this.renderer = this.options.renderer, this.renderer.options =
                this.options, this.textRenderer = new Ye
        }
        static parse(e, t) {
            return new Ze(t).parse(e)
        }
        static parseInline(e, t) {
            return new Ze(t).parseInline(e)
        }
        parse(e, t = !0) {
            let n = "";
            for (let r = 0; r < e.length; r++) {
                const s = e[r];
                if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
                    const e = s,
                        t = this.options.extensions.renderers[e.type].call({
                            parser: this
                        }, e);
                    if (!1 !== t || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(e.type)) {
                        n += t || "";
                        continue
                    }
                }
                switch (s.type) {
                    case "space":
                        continue;
                    case "hr":
                        n += this.renderer.hr();
                        continue;
                    case "heading": {
                        const e = s;
                        n += this.renderer.heading(this.parseInline(e.tokens), e.depth, ee(this.parseInline(e.tokens, this.textRenderer)));
                        continue
                    }
                    case "code": {
                        const e = s;
                        n += this.renderer.code(e.text, e.lang, !!e.escaped);
                        continue
                    }
                    case "table": {
                        const e = s;
                        let t = "",
                            r = "";
                        for (let t = 0; t < e.header.length; t++) r += this.renderer.tablecell(this.parseInline(e.header[t].tokens), {
                            header: !0,
                            align: e.align[t]
                        });
                        t += this.renderer.tablerow(r);
                        let i = "";
                        for (let t = 0; t < e.rows.length; t++) {
                            const n = e.rows[t];
                            r = "";
                            for (let t = 0; t < n.length; t++) r += this.renderer.tablecell(this.parseInline(n[t].tokens), {
                                header: !1,
                                align: e.align[t]
                            });
                            i += this.renderer.tablerow(r)
                        }
                        n += this.renderer.table(t, i);
                        continue
                    }
                    case "blockquote": {
                        const e = s,
                            t = this.parse(e.tokens);
                        n += this.renderer.blockquote(t);
                        continue
                    }
                    case "list": {
                        const e = s,
                            t = e.ordered,
                            r = e.start,
                            i = e.loose;
                        let o = "";
                        for (let t = 0; t < e.items.length; t++) {
                            const n = e.items[t],
                                r = n.checked,
                                s = n.task;
                            let a = "";
                            if (n.task) {
                                const e = this.renderer.checkbox(!!r);
                                i ? n.tokens.length > 0 && "paragraph" === n.tokens[0].type ? (n.tokens[0].text = e + " " + n.tokens[0].text, n.tokens[0]
                                    .tokens && n.tokens[0].tokens.length > 0 && "text" === n.tokens[0].tokens[0].type && (n.tokens[0].tokens[0].text =
                                        e + " " + n.tokens[0].tokens[0].text)) : n.tokens.unshift({
                                    type: "text",
                                    text: e + " "
                                }) : a += e + " "
                            }
                            a += this.parse(n.tokens, i), o += this.renderer.listitem(a, s, !!r)
                        }
                        n += this.renderer.list(o, t, r);
                        continue
                    }
                    case "html": {
                        const e = s;
                        n += this.renderer.html(e.text, e.block);
                        continue
                    }
                    case "paragraph": {
                        const e = s;
                        n += this.renderer.paragraph(this.parseInline(e.tokens));
                        continue
                    }
                    case "text": {
                        let i = s,
                            o = i.tokens ? this.parseInline(i.tokens) : i.text;
                        for (; r + 1 < e.length && "text" === e[r + 1].type;) i = e[++r], o += "\n" + (i.tokens ? this.parseInline(i.tokens) : i.text);
                        n += t ? this.renderer.paragraph(o) : o;
                        continue
                    }
                    default: {
                        const e = 'Token with "' + s.type + '" type was not found.';
                        if (this.options.silent) return console.error(e), "";
                        throw new Error(e)
                    }
                }
            }
            return n
        }
        parseInline(e, t) {
            t = t || this.renderer;
            let n = "";
            for (let r = 0; r < e.length; r++) {
                const s = e[r];
                if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[s.type]) {
                    const e = this.options.extensions.renderers[s.type].call({
                        parser: this
                    }, s);
                    if (!1 !== e || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(s.type)) {
                        n += e || "";
                        continue
                    }
                }
                switch (s.type) {
                    case "escape": {
                        const e = s;
                        n += t.text(e.text);
                        break
                    }
                    case "html": {
                        const e = s;
                        n += t.html(e.text);
                        break
                    }
                    case "link": {
                        const e = s;
                        n += t.link(e.href, e.title, this.parseInline(e.tokens, t));
                        break
                    }
                    case "image": {
                        const e = s;
                        n += t.image(e.href, e.title, e.text);
                        break
                    }
                    case "strong": {
                        const e = s;
                        n += t.strong(this.parseInline(e.tokens, t));
                        break
                    }
                    case "em": {
                        const e = s;
                        n += t.em(this.parseInline(e.tokens, t));
                        break
                    }
                    case "codespan": {
                        const e = s;
                        n += t.codespan(e.text);
                        break
                    }
                    case "br":
                        n += t.br();
                        break;
                    case "del": {
                        const e = s;
                        n += t.del(this.parseInline(e.tokens, t));
                        break
                    }
                    case "text": {
                        const e = s;
                        n += t.text(e.text);
                        break
                    }
                    default: {
                        const e = 'Token with "' + s.type + '" type was not found.';
                        if (this.options.silent) return console.error(e), "";
                        throw new Error(e)
                    }
                }
            }
            return n
        }
    }
    class Qe {
        options;
        constructor(e) {
            this.options = e || U
        }
        static passThroughHooks = new Set(["preprocess", "postprocess", "processAllTokens"]);
        preprocess(e) {
            return e
        }
        postprocess(e) {
            return e
        }
        processAllTokens(e) {
            return e
        }
    }
    const Xe = new class {
        defaults = {
            async: !1,
            breaks: !1,
            extensions: null,
            gfm: !0,
            hooks: null,
            pedantic: !1,
            renderer: null,
            silent: !1,
            tokenizer: null,
            walkTokens: null
        };
        options = this.setOptions;
        parse = this.#e(Ge.lex, Ze.parse);
        parseInline = this.#e(Ge.lexInline, Ze.parseInline);
        Parser = Ze;
        Renderer = Ke;
        TextRenderer = Ye;
        Lexer = Ge;
        Tokenizer = le;
        Hooks = Qe;
        constructor(...e) {
            this.use(...e)
        }
        walkTokens(e, t) {
            let n = [];
            for (const r of e) switch (n = n.concat(t.call(this, r)), r.type) {
                case "table": {
                    const e = r;
                    for (const r of e.header) n = n.concat(this.walkTokens(r.tokens, t));
                    for (const r of e.rows)
                        for (const e of r) n = n.concat(this.walkTokens(e.tokens, t));
                    break
                }
                case "list": {
                    const e = r;
                    n = n.concat(this.walkTokens(e.items, t));
                    break
                }
                default: {
                    const e = r;
                    this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((r => {
                        const s = e[r].flat(1 / 0);
                        n = n.concat(this.walkTokens(s, t))
                    })) : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t)))
                }
            }
            return n
        }
        use(...e) {
            const t = this.defaults.extensions || {
                renderers: {},
                childTokens: {}
            };
            return e.forEach((e => {
                const n = {
                    ...e
                };
                if (n.async = this.defaults.async || n.async || !1, e.extensions && (e.extensions.forEach((e => {
                        if (!e.name) throw new Error("extension name required");
                        if ("renderer" in e) {
                            const n = t.renderers[e.name];
                            t.renderers[e.name] = n ? function(...t) {
                                let r = e.renderer.apply(this, t);
                                return !1 === r && (r = n.apply(this, t)), r
                            } : e.renderer
                        }
                        if ("tokenizer" in e) {
                            if (!e.level || "block" !== e.level && "inline" !== e.level) throw new Error(
                                "extension level must be 'block' or 'inline'");
                            const n = t[e.level];
                            n ? n.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && ("block" === e.level ? t
                                .startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : "inline" === e
                                .level && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]))
                        }
                        "childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens)
                    })), n.extensions = t), e.renderer) {
                    const t = this.defaults.renderer || new Ke(this.defaults);
                    for (const n in e.renderer) {
                        if (!(n in t)) throw new Error(`renderer '${n}' does not exist`);
                        if ("options" === n) continue;
                        const r = n,
                            s = e.renderer[r],
                            i = t[r];
                        t[r] = (...e) => {
                            let n = s.apply(t, e);
                            return !1 === n && (n = i.apply(t, e)), n || ""
                        }
                    }
                    n.renderer = t
                }
                if (e.tokenizer) {
                    const t = this.defaults.tokenizer || new le(this.defaults);
                    for (const n in e.tokenizer) {
                        if (!(n in t)) throw new Error(`tokenizer '${n}' does not exist`);
                        if (["options", "rules", "lexer"].includes(n)) continue;
                        const r = n,
                            s = e.tokenizer[r],
                            i = t[r];
                        t[r] = (...e) => {
                            let n = s.apply(t, e);
                            return !1 === n && (n = i.apply(t, e)), n
                        }
                    }
                    n.tokenizer = t
                }
                if (e.hooks) {
                    const t = this.defaults.hooks || new Qe;
                    for (const n in e.hooks) {
                        if (!(n in t)) throw new Error(`hook '${n}' does not exist`);
                        if ("options" === n) continue;
                        const r = n,
                            s = e.hooks[r],
                            i = t[r];
                        Qe.passThroughHooks.has(n) ? t[r] = e => {
                            if (this.defaults.async) return Promise.resolve(s.call(t, e)).then((e => i.call(t, e)));
                            const n = s.call(t, e);
                            return i.call(t, n)
                        } : t[r] = (...e) => {
                            let n = s.apply(t, e);
                            return !1 === n && (n = i.apply(t, e)), n
                        }
                    }
                    n.hooks = t
                }
                if (e.walkTokens) {
                    const t = this.defaults.walkTokens,
                        r = e.walkTokens;
                    n.walkTokens = function(e) {
                        let n = [];
                        return n.push(r.call(this, e)), t && (n = n.concat(t.call(this, e))), n
                    }
                }
                this.defaults = {
                    ...this.defaults,
                    ...n
                }
            })), this
        }
        setOptions(e) {
            return this.defaults = {
                ...this.defaults,
                ...e
            }, this
        }
        lexer(e, t) {
            return Ge.lex(e, t ?? this.defaults)
        }
        parser(e, t) {
            return Ze.parse(e, t ?? this.defaults)
        }
        #e(e, t) {
            return (n, r) => {
                const s = {
                        ...r
                    },
                    i = {
                        ...this.defaults,
                        ...s
                    };
                !0 === this.defaults.async && !1 === s.async && (i.silent || console.warn(
                        "marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), i
                    .async = !0);
                const o = this.#t(!!i.silent, !!i.async);
                if (null == n) return o(new Error("marked(): input parameter is undefined or null"));
                if ("string" != typeof n) return o(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) +
                    ", string expected"));
                if (i.hooks && (i.hooks.options = i), i.async) return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n).then((t => e(t, i)))
                    .then((e => i.hooks ? i.hooks.processAllTokens(e) : e)).then((e => i.walkTokens ? Promise.all(this.walkTokens(e, i
                        .walkTokens)).then((() => e)) : e)).then((e => t(e, i))).then((e => i.hooks ? i.hooks.postprocess(e) : e)).catch(o);
                try {
                    i.hooks && (n = i.hooks.preprocess(n));
                    let r = e(n, i);
                    i.hooks && (r = i.hooks.processAllTokens(r)), i.walkTokens && this.walkTokens(r, i.walkTokens);
                    let s = t(r, i);
                    return i.hooks && (s = i.hooks.postprocess(s)), s
                } catch (e) {
                    return o(e)
                }
            }
        }
        #t(e, t) {
            return n => {
                if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
                    const e = "<p>An error occurred:</p><pre>" + J(n.message + "", !0) + "</pre>";
                    return t ? Promise.resolve(e) : e
                }
                if (t) return Promise.reject(n);
                throw n
            }
        }
    };

    function Ve(e, t) {
        return Xe.parse(e, t)
    }
    Ve.options = Ve.setOptions = function(e) {
            return Xe.setOptions(e), Ve.defaults = Xe.defaults, G(Ve.defaults), Ve
        }, Ve.getDefaults = q, Ve.defaults = U, Ve.use = function(...e) {
            return Xe.use(...e), Ve.defaults = Xe.defaults, G(Ve.defaults), Ve
        }, Ve.walkTokens = function(e, t) {
            return Xe.walkTokens(e, t)
        }, Ve.parseInline = Xe.parseInline, Ve.Parser = Ze, Ve.parser = Ze.parse, Ve.Renderer = Ke, Ve.TextRenderer = Ye, Ve.Lexer = Ge, Ve.lexer = Ge.lex, Ve
        .Tokenizer = le, Ve.Hooks = Qe, Ve.parse = Ve;
    Ve.options, Ve.setOptions, Ve.use, Ve.walkTokens, Ve.parseInline, Ze.parse, Ge.lex;
    var Je, We, et, tt, nt, rt, st, it, ot, at, lt, ct = ct || (Je = Math, et = (We = {}).lib = {}, tt = et.Base = function() {
        function e() {}
        return {
            extend: function(t) {
                e.prototype = this;
                var n = new e;
                return t && n.mixIn(t), n.hasOwnProperty("init") || (n.init = function() {
                    n.$super.init.apply(this, arguments)
                }), n.init.prototype = n, n.$super = this, n
            },
            create: function() {
                var e = this.extend();
                return e.init.apply(e, arguments), e
            },
            init: function() {},
            mixIn: function(e) {
                for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                e.hasOwnProperty("toString") && (this.toString = e.toString)
            },
            clone: function() {
                return this.init.prototype.extend(this)
            }
        }
    }(), nt = et.WordArray = tt.extend({
        init: function(e, t) {
            e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length
        },
        toString: function(e) {
            return (e || st).stringify(this)
        },
        concat: function(e) {
            var t = this.words,
                n = e.words,
                r = this.sigBytes,
                s = e.sigBytes;
            if (this.clamp(), r % 4)
                for (var i = 0; s > i; i++) {
                    var o = n[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    t[r + i >>> 2] |= o << 24 - (r + i) % 4 * 8
                } else if (n.length > 65535)
                    for (i = 0; s > i; i += 4) t[r + i >>> 2] = n[i >>> 2];
                else t.push.apply(t, n);
            return this.sigBytes += s, this
        },
        clamp: function() {
            var e = this.words,
                t = this.sigBytes;
            e[t >>> 2] &= 4294967295 << 32 - t % 4 * 8, e.length = Je.ceil(t / 4)
        },
        clone: function() {
            var e = tt.clone.call(this);
            return e.words = this.words.slice(0), e
        },
        random: function(e) {
            for (var t = [], n = 0; e > n; n += 4) t.push(4294967296 * Je.random() | 0);
            return new nt.init(t, e)
        }
    }), rt = We.enc = {}, st = rt.Hex = {
        stringify: function(e) {
            for (var t = e.words, n = e.sigBytes, r = [], s = 0; n > s; s++) {
                var i = t[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                r.push((i >>> 4).toString(16)), r.push((15 & i).toString(16))
            }
            return r.join("")
        },
        parse: function(e) {
            for (var t = e.length, n = [], r = 0; t > r; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
            return new nt.init(n, t / 2)
        }
    }, it = rt.Latin1 = {
        stringify: function(e) {
            for (var t = e.words, n = e.sigBytes, r = [], s = 0; n > s; s++) {
                var i = t[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                r.push(String.fromCharCode(i))
            }
            return r.join("")
        },
        parse: function(e) {
            for (var t = e.length, n = [], r = 0; t > r; r++) n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
            return new nt.init(n, t)
        }
    }, ot = rt.Utf8 = {
        stringify: function(e) {
            try {
                return decodeURIComponent(escape(it.stringify(e)))
            } catch (e) {
                throw new Error("Malformed UTF-8 data")
            }
        },
        parse: function(e) {
            return it.parse(unescape(encodeURIComponent(e)))
        }
    }, at = et.BufferedBlockAlgorithm = tt.extend({
        reset: function() {
            this._data = new nt.init, this._nDataBytes = 0
        },
        _append: function(e) {
            "string" == typeof e && (e = ot.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
        },
        _process: function(e) {
            var t = this._data,
                n = t.words,
                r = t.sigBytes,
                s = this.blockSize,
                i = r / (4 * s),
                o = (i = e ? Je.ceil(i) : Je.max((0 | i) - this._minBufferSize, 0)) * s,
                a = Je.min(4 * o, r);
            if (o) {
                for (var l = 0; o > l; l += s) this._doProcessBlock(n, l);
                var c = n.splice(0, o);
                t.sigBytes -= a
            }
            return new nt.init(c, a)
        },
        clone: function() {
            var e = tt.clone.call(this);
            return e._data = this._data.clone(), e
        },
        _minBufferSize: 0
    }), et.Hasher = at.extend({
        cfg: tt.extend(),
        init: function(e) {
            this.cfg = this.cfg.extend(e), this.reset()
        },
        reset: function() {
            at.reset.call(this), this._doReset()
        },
        update: function(e) {
            return this._append(e), this._process(), this
        },
        finalize: function(e) {
            return e && this._append(e), this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function(e) {
            return function(t, n) {
                return new e.init(n).finalize(t)
            }
        },
        _createHmacHelper: function(e) {
            return function(t, n) {
                return new lt.HMAC.init(e, n).finalize(t)
            }
        }
    }), lt = We.algo = {}, We);
    ! function() {
        var e = ct,
            t = e.lib.WordArray;
        e.enc.Base64 = {
            stringify: function(e) {
                var t = e.words,
                    n = e.sigBytes,
                    r = this._map;
                e.clamp();
                for (var s = [], i = 0; n > i; i += 3)
                    for (var o = (t[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 16 | (t[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255) << 8 | t[i + 2 >>> 2] >>>
                            24 - (i + 2) % 4 * 8 & 255, a = 0; 4 > a && n > i + .75 * a; a++) s.push(r.charAt(o >>> 6 * (3 - a) & 63));
                var l = r.charAt(64);
                if (l)
                    for (; s.length % 4;) s.push(l);
                return s.join("")
            },
            parse: function(e) {
                var n = e.length,
                    r = this._map,
                    s = r.charAt(64);
                if (s) {
                    var i = e.indexOf(s); - 1 != i && (n = i)
                }
                for (var o = [], a = 0, l = 0; n > l; l++)
                    if (l % 4) {
                        var c = r.indexOf(e.charAt(l - 1)) << l % 4 * 2,
                            h = r.indexOf(e.charAt(l)) >>> 6 - l % 4 * 2;
                        o[a >>> 2] |= (c | h) << 24 - a % 4 * 8, a++
                    } return t.create(o, a)
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        }
    }(),
    function(e) {
        function t(e, t, n, r, s, i, o) {
            var a = e + (t & n | ~t & r) + s + o;
            return (a << i | a >>> 32 - i) + t
        }

        function n(e, t, n, r, s, i, o) {
            var a = e + (t & r | n & ~r) + s + o;
            return (a << i | a >>> 32 - i) + t
        }

        function r(e, t, n, r, s, i, o) {
            var a = e + (t ^ n ^ r) + s + o;
            return (a << i | a >>> 32 - i) + t
        }

        function s(e, t, n, r, s, i, o) {
            var a = e + (n ^ (t | ~r)) + s + o;
            return (a << i | a >>> 32 - i) + t
        }
        var i = ct,
            o = i.lib,
            a = o.WordArray,
            l = o.Hasher,
            c = i.algo,
            h = [];
        ! function() {
            for (var t = 0; 64 > t; t++) h[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0
        }();
        var u = c.MD5 = l.extend({
            _doReset: function() {
                this._hash = new a.init([1732584193, 4023233417, 2562383102, 271733878])
            },
            _doProcessBlock: function(e, i) {
                for (var o = 0; 16 > o; o++) {
                    var a = i + o,
                        l = e[a];
                    e[a] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
                }
                var c = this._hash.words,
                    u = e[i + 0],
                    p = e[i + 1],
                    f = e[i + 2],
                    d = e[i + 3],
                    g = e[i + 4],
                    k = e[i + 5],
                    m = e[i + 6],
                    y = e[i + 7],
                    x = e[i + 8],
                    w = e[i + 9],
                    b = e[i + 10],
                    v = e[i + 11],
                    _ = e[i + 12],
                    E = e[i + 13],
                    S = e[i + 14],
                    T = e[i + 15],
                    C = c[0],
                    A = c[1],
                    O = c[2],
                    R = c[3];
                C = t(C, A, O, R, u, 7, h[0]), R = t(R, C, A, O, p, 12, h[1]), O = t(O, R, C, A, f, 17, h[2]), A = t(A, O, R, C, d, 22, h[3]), C =
                    t(C, A, O, R, g, 7, h[4]), R = t(R, C, A, O, k, 12, h[5]), O = t(O, R, C, A, m, 17, h[6]), A = t(A, O, R, C, y, 22, h[7]), C =
                    t(C, A, O, R, x, 7, h[8]), R = t(R, C, A, O, w, 12, h[9]), O = t(O, R, C, A, b, 17, h[10]), A = t(A, O, R, C, v, 22, h[11]), C =
                    t(C, A, O, R, _, 7, h[12]), R = t(R, C, A, O, E, 12, h[13]), O = t(O, R, C, A, S, 17, h[14]), C = n(C, A = t(A, O, R, C, T, 22,
                        h[15]), O, R, p, 5, h[16]), R = n(R, C, A, O, m, 9, h[17]), O = n(O, R, C, A, v, 14, h[18]), A = n(A, O, R, C, u, 20, h[
                    19]), C = n(C, A, O, R, k, 5, h[20]), R = n(R, C, A, O, b, 9, h[21]), O = n(O, R, C, A, T, 14, h[22]), A = n(A, O, R, C, g, 20,
                        h[23]), C = n(C, A, O, R, w, 5, h[24]), R = n(R, C, A, O, S, 9, h[25]), O = n(O, R, C, A, d, 14, h[26]), A = n(A, O, R, C,
                        x, 20, h[27]), C = n(C, A, O, R, E, 5, h[28]), R = n(R, C, A, O, f, 9, h[29]), O = n(O, R, C, A, y, 14, h[30]), C = r(C, A =
                        n(A, O, R, C, _, 20, h[31]), O, R, k, 4, h[32]), R = r(R, C, A, O, x, 11, h[33]), O = r(O, R, C, A, v, 16, h[34]), A = r(A,
                        O, R, C, S, 23, h[35]), C = r(C, A, O, R, p, 4, h[36]), R = r(R, C, A, O, g, 11, h[37]), O = r(O, R, C, A, y, 16, h[38]),
                    A = r(A, O, R, C, b, 23, h[39]), C = r(C, A, O, R, E, 4, h[40]), R = r(R, C, A, O, u, 11, h[41]), O = r(O, R, C, A, d, 16, h[
                        42]), A = r(A, O, R, C, m, 23, h[43]), C = r(C, A, O, R, w, 4, h[44]), R = r(R, C, A, O, _, 11, h[45]), O = r(O, R, C, A, T,
                        16, h[46]), C = s(C, A = r(A, O, R, C, f, 23, h[47]), O, R, u, 6, h[48]), R = s(R, C, A, O, y, 10, h[49]), O = s(O, R, C, A,
                        S, 15, h[50]), A = s(A, O, R, C, k, 21, h[51]), C = s(C, A, O, R, _, 6, h[52]), R = s(R, C, A, O, d, 10, h[53]), O = s(O, R,
                        C, A, b, 15, h[54]), A = s(A, O, R, C, p, 21, h[55]), C = s(C, A, O, R, x, 6, h[56]), R = s(R, C, A, O, T, 10, h[57]), O =
                    s(O, R, C, A, m, 15, h[58]), A = s(A, O, R, C, E, 21, h[59]), C = s(C, A, O, R, g, 6, h[60]), R = s(R, C, A, O, v, 10, h[61]),
                    O = s(O, R, C, A, f, 15, h[62]), A = s(A, O, R, C, w, 21, h[63]), c[0] = c[0] + C | 0, c[1] = c[1] + A | 0, c[2] = c[2] + O | 0,
                    c[3] = c[3] + R | 0
            },
            _doFinalize: function() {
                var t = this._data,
                    n = t.words,
                    r = 8 * this._nDataBytes,
                    s = 8 * t.sigBytes;
                n[s >>> 5] |= 128 << 24 - s % 32;
                var i = e.floor(r / 4294967296),
                    o = r;
                n[15 + (s + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), n[14 + (s + 64 >>> 9 << 4)] =
                    16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();
                for (var a = this._hash, l = a.words, c = 0; 4 > c; c++) {
                    var h = l[c];
                    l[c] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8)
                }
                return a
            },
            clone: function() {
                var e = l.clone.call(this);
                return e._hash = this._hash.clone(), e
            }
        });
        i.MD5 = l._createHelper(u), i.HmacMD5 = l._createHmacHelper(u)
    }(Math),
    function() {
        var e = ct,
            t = e.lib,
            n = t.Base,
            r = t.WordArray,
            s = e.algo,
            i = s.MD5,
            o = s.EvpKDF = n.extend({
                cfg: n.extend({
                    keySize: 4,
                    hasher: i,
                    iterations: 1
                }),
                init: function(e) {
                    this.cfg = this.cfg.extend(e)
                },
                compute: function(e, t) {
                    for (var n = this.cfg, s = n.hasher.create(), i = r.create(), o = i.words, a = n.keySize, l = n.iterations; o.length < a;) {
                        c && s.update(c);
                        var c = s.update(e).finalize(t);
                        s.reset();
                        for (var h = 1; l > h; h++) c = s.finalize(c), s.reset();
                        i.concat(c)
                    }
                    return i.sigBytes = 4 * a, i
                }
            });
        e.EvpKDF = function(e, t, n) {
            return o.create(n).compute(e, t)
        }
    }(), ct.lib.Cipher || function(e) {
            var t = ct,
                n = t.lib,
                r = n.Base,
                s = n.WordArray,
                i = n.BufferedBlockAlgorithm,
                o = t.enc,
                a = (o.Utf8, o.Base64),
                l = t.algo.EvpKDF,
                c = n.Cipher = i.extend({
                    cfg: r.extend(),
                    createEncryptor: function(e, t) {
                        return this.create(this._ENC_XFORM_MODE, e, t)
                    },
                    createDecryptor: function(e, t) {
                        return this.create(this._DEC_XFORM_MODE, e, t)
                    },
                    init: function(e, t, n) {
                        this.cfg = this.cfg.extend(n), this._xformMode = e, this._key = t, this.reset()
                    },
                    reset: function() {
                        i.reset.call(this), this._doReset()
                    },
                    process: function(e) {
                        return this._append(e), this._process()
                    },
                    finalize: function(e) {
                        return e && this._append(e), this._doFinalize()
                    },
                    keySize: 4,
                    ivSize: 4,
                    _ENC_XFORM_MODE: 1,
                    _DEC_XFORM_MODE: 2,
                    _createHelper: function() {
                        function e(e) {
                            return "string" == typeof e ? y : k
                        }
                        return function(t) {
                            return {
                                encrypt: function(n, r, s) {
                                    return e(r).encrypt(t, n, r, s)
                                },
                                decrypt: function(n, r, s) {
                                    return e(r).decrypt(t, n, r, s)
                                }
                            }
                        }
                    }()
                }),
                h = (n.StreamCipher = c.extend({
                    _doFinalize: function() {
                        return this._process(!0)
                    },
                    blockSize: 1
                }), t.mode = {}),
                u = n.BlockCipherMode = r.extend({
                    createEncryptor: function(e, t) {
                        return this.Encryptor.create(e, t)
                    },
                    createDecryptor: function(e, t) {
                        return this.Decryptor.create(e, t)
                    },
                    init: function(e, t) {
                        this._cipher = e, this._iv = t
                    }
                }),
                p = h.CBC = function() {
                    function e(e, t, n) {
                        var r = this._iv;
                        if (r) {
                            var s = r;
                            this._iv = undefined
                        } else s = this._prevBlock;
                        for (var i = 0; n > i; i++) e[t + i] ^= s[i]
                    }
                    var t = u.extend();
                    return t.Encryptor = t.extend({
                        processBlock: function(t, n) {
                            var r = this._cipher,
                                s = r.blockSize;
                            e.call(this, t, n, s), r.encryptBlock(t, n), this._prevBlock = t.slice(n, n + s)
                        }
                    }), t.Decryptor = t.extend({
                        processBlock: function(t, n) {
                            var r = this._cipher,
                                s = r.blockSize,
                                i = t.slice(n, n + s);
                            r.decryptBlock(t, n), e.call(this, t, n, s), this._prevBlock = i
                        }
                    }), t
                }(),
                f = (t.pad = {}).Pkcs7 = {
                    pad: function(e, t) {
                        for (var n = 4 * t, r = n - e.sigBytes % n, i = r << 24 | r << 16 | r << 8 | r, o = [], a = 0; r > a; a += 4) o.push(i);
                        var l = s.create(o, r);
                        e.concat(l)
                    },
                    unpad: function(e) {
                        var t = 255 & e.words[e.sigBytes - 1 >>> 2];
                        e.sigBytes -= t
                    }
                },
                d = (n.BlockCipher = c.extend({
                    cfg: c.cfg.extend({
                        mode: p,
                        padding: f
                    }),
                    reset: function() {
                        c.reset.call(this);
                        var e = this.cfg,
                            t = e.iv,
                            n = e.mode;
                        if (this._xformMode == this._ENC_XFORM_MODE) var r = n.createEncryptor;
                        else {
                            r = n.createDecryptor;
                            this._minBufferSize = 1
                        }
                        this._mode = r.call(n, this, t && t.words)
                    },
                    _doProcessBlock: function(e, t) {
                        this._mode.processBlock(e, t)
                    },
                    _doFinalize: function() {
                        var e = this.cfg.padding;
                        if (this._xformMode == this._ENC_XFORM_MODE) {
                            e.pad(this._data, this.blockSize);
                            var t = this._process(!0)
                        } else {
                            t = this._process(!0);
                            e.unpad(t)
                        }
                        return t
                    },
                    blockSize: 4
                }), n.CipherParams = r.extend({
                    init: function(e) {
                        this.mixIn(e)
                    },
                    toString: function(e) {
                        return (e || this.formatter).stringify(this)
                    }
                })),
                g = (t.format = {}).OpenSSL = {
                    stringify: function(e) {
                        var t = e.ciphertext,
                            n = e.salt;
                        if (n) var r = s.create([1398893684, 1701076831]).concat(n).concat(t);
                        else r = t;
                        return r.toString(a)
                    },
                    parse: function(e) {
                        var t = a.parse(e),
                            n = t.words;
                        if (1398893684 == n[0] && 1701076831 == n[1]) {
                            var r = s.create(n.slice(2, 4));
                            n.splice(0, 4), t.sigBytes -= 16
                        }
                        return d.create({
                            ciphertext: t,
                            salt: r
                        })
                    }
                },
                k = n.SerializableCipher = r.extend({
                    cfg: r.extend({
                        format: g
                    }),
                    encrypt: function(e, t, n, r) {
                        r = this.cfg.extend(r);
                        var s = e.createEncryptor(n, r),
                            i = s.finalize(t),
                            o = s.cfg;
                        return d.create({
                            ciphertext: i,
                            key: n,
                            iv: o.iv,
                            algorithm: e,
                            mode: o.mode,
                            padding: o.padding,
                            blockSize: e.blockSize,
                            formatter: r.format
                        })
                    },
                    decrypt: function(e, t, n, r) {
                        return r = this.cfg.extend(r), t = this._parse(t, r.format), e.createDecryptor(n, r).finalize(t.ciphertext)
                    },
                    _parse: function(e, t) {
                        return "string" == typeof e ? t.parse(e, this) : e
                    }
                }),
                m = (t.kdf = {}).OpenSSL = {
                    execute: function(e, t, n, r) {
                        r || (r = s.random(8));
                        var i = l.create({
                                keySize: t + n
                            }).compute(e, r),
                            o = s.create(i.words.slice(t), 4 * n);
                        return i.sigBytes = 4 * t, d.create({
                            key: i,
                            iv: o,
                            salt: r
                        })
                    }
                },
                y = n.PasswordBasedCipher = k.extend({
                    cfg: k.cfg.extend({
                        kdf: m
                    }),
                    encrypt: function(e, t, n, r) {
                        var s = (r = this.cfg.extend(r)).kdf.execute(n, e.keySize, e.ivSize);
                        r.iv = s.iv;
                        var i = k.encrypt.call(this, e, t, s.key, r);
                        return i.mixIn(s), i
                    },
                    decrypt: function(e, t, n, r) {
                        r = this.cfg.extend(r), t = this._parse(t, r.format);
                        var s = r.kdf.execute(n, e.keySize, e.ivSize, t.salt);
                        return r.iv = s.iv, k.decrypt.call(this, e, t, s.key, r)
                    }
                })
        }(),
        function() {
            var e = ct,
                t = e.lib.BlockCipher,
                n = e.algo,
                r = [],
                s = [],
                i = [],
                o = [],
                a = [],
                l = [],
                c = [],
                h = [],
                u = [],
                p = [];
            ! function() {
                for (var e = [], t = 0; 256 > t; t++) e[t] = 128 > t ? t << 1 : t << 1 ^ 283;
                var n = 0,
                    f = 0;
                for (t = 0; 256 > t; t++) {
                    var d = f ^ f << 1 ^ f << 2 ^ f << 3 ^ f << 4;
                    d = d >>> 8 ^ 255 & d ^ 99, r[n] = d, s[d] = n;
                    var g = e[n],
                        k = e[g],
                        m = e[k],
                        y = 257 * e[d] ^ 16843008 * d;
                    i[n] = y << 24 | y >>> 8, o[n] = y << 16 | y >>> 16, a[n] = y << 8 | y >>> 24, l[n] = y;
                    y = 16843009 * m ^ 65537 * k ^ 257 * g ^ 16843008 * n;
                    c[d] = y << 24 | y >>> 8, h[d] = y << 16 | y >>> 16, u[d] = y << 8 | y >>> 24, p[d] = y, n ? (n = g ^ e[e[e[m ^ g]]], f ^= e[e[f]]) : n =
                        f = 1
                }
            }();
            var f = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                d = n.AES = t.extend({
                    _doReset: function() {
                        for (var e = this._key, t = e.words, n = e.sigBytes / 4, s = 4 * ((this._nRounds = n + 6) + 1), i = this._keySchedule = [], o =
                                0; s > o; o++)
                            if (n > o) i[o] = t[o];
                            else {
                                var a = i[o - 1];
                                o % n ? n > 6 && o % n == 4 && (a = r[a >>> 24] << 24 | r[a >>> 16 & 255] << 16 | r[a >>> 8 & 255] << 8 | r[255 & a]) :
                                    (a = r[(a = a << 8 | a >>> 24) >>> 24] << 24 | r[a >>> 16 & 255] << 16 | r[a >>> 8 & 255] << 8 | r[255 & a], a ^= f[
                                        o / n | 0] << 24), i[o] = i[o - n] ^ a
                            } for (var l = this._invKeySchedule = [], d = 0; s > d; d++) {
                            o = s - d;
                            if (d % 4) a = i[o];
                            else a = i[o - 4];
                            l[d] = 4 > d || 4 >= o ? a : c[r[a >>> 24]] ^ h[r[a >>> 16 & 255]] ^ u[r[a >>> 8 & 255]] ^ p[r[255 & a]]
                        }
                    },
                    encryptBlock: function(e, t) {
                        this._doCryptBlock(e, t, this._keySchedule, i, o, a, l, r)
                    },
                    decryptBlock: function(e, t) {
                        var n = e[t + 1];
                        e[t + 1] = e[t + 3], e[t + 3] = n, this._doCryptBlock(e, t, this._invKeySchedule, c, h, u, p, s);
                        n = e[t + 1];
                        e[t + 1] = e[t + 3], e[t + 3] = n
                    },
                    _doCryptBlock: function(e, t, n, r, s, i, o, a) {
                        for (var l = this._nRounds, c = e[t] ^ n[0], h = e[t + 1] ^ n[1], u = e[t + 2] ^ n[2], p = e[t + 3] ^ n[3], f = 4, d = 1; l >
                            d; d++) {
                            var g = r[c >>> 24] ^ s[h >>> 16 & 255] ^ i[u >>> 8 & 255] ^ o[255 & p] ^ n[f++],
                                k = r[h >>> 24] ^ s[u >>> 16 & 255] ^ i[p >>> 8 & 255] ^ o[255 & c] ^ n[f++],
                                m = r[u >>> 24] ^ s[p >>> 16 & 255] ^ i[c >>> 8 & 255] ^ o[255 & h] ^ n[f++],
                                y = r[p >>> 24] ^ s[c >>> 16 & 255] ^ i[h >>> 8 & 255] ^ o[255 & u] ^ n[f++];
                            c = g, h = k, u = m, p = y
                        }
                        g = (a[c >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & p]) ^ n[f++], k = (a[h >>> 24] << 24 | a[
                            u >>> 16 & 255] << 16 | a[p >>> 8 & 255] << 8 | a[255 & c]) ^ n[f++], m = (a[u >>> 24] << 24 | a[p >>> 16 & 255] << 16 |
                            a[c >>> 8 & 255] << 8 | a[255 & h]) ^ n[f++], y = (a[p >>> 24] << 24 | a[c >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 |
                            a[255 & u]) ^ n[f++];
                        e[t] = g, e[t + 1] = k, e[t + 2] = m, e[t + 3] = y
                    },
                    keySize: 8
                });
            e.AES = t._createHelper(d)
        }();
    var ht = function() {
        var e = {};
        return function(t) {
            t.formatter = {
                prefix: "",
                stringify: function(e) {
                    var t = this.prefix;
                    return (t += e.salt.toString()) + e.ciphertext.toString()
                },
                parse: function(e) {
                    var t = ct.lib.CipherParams.create({}),
                        n = this.prefix.length;
                    return 0 !== e.indexOf(this.prefix) || (t.ciphertext = ct.enc.Hex.parse(e.substring(16 + n)), t.salt = ct.enc.Hex.parse(e
                        .substring(n, 16 + n))), t
                }
            }, e.encrypt = function(e, n) {
                try {
                    return ct.AES.encrypt(e, n, {
                        format: t.formatter
                    }).toString()
                } catch (e) {
                    return ""
                }
            }, e.decrypt = function(e, n) {
                try {
                    return ct.AES.decrypt(e, n, {
                        format: t.formatter
                    }).toString(ct.enc.Utf8)
                } catch (e) {
                    return ""
                }
            }
        }(e), e
    }();

    function ut(e) {
        return ut = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, ut(e)
    }

    function pt() {
        pt = function() {
            return e
        };
        var e = {},
            t = Object.prototype,
            n = t.hasOwnProperty,
            r = Object.defineProperty || function(e, t, n) {
                e[t] = n.value
            },
            s = "function" == typeof Symbol ? Symbol : {},
            i = s.iterator || "@@iterator",
            o = s.asyncIterator || "@@asyncIterator",
            a = s.toStringTag || "@@toStringTag";

        function l(e, t, n) {
            return Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }), e[t]
        }
        try {
            l({}, "")
        } catch (e) {
            l = function(e, t, n) {
                return e[t] = n
            }
        }

        function c(e, t, n, s) {
            var i = t && t.prototype instanceof p ? t : p,
                o = Object.create(i.prototype),
                a = new S(s || []);
            return r(o, "_invoke", {
                value: b(e, n, a)
            }), o
        }

        function h(e, t, n) {
            try {
                return {
                    type: "normal",
                    arg: e.call(t, n)
                }
            } catch (e) {
                return {
                    type: "throw",
                    arg: e
                }
            }
        }
        e.wrap = c;
        var u = {};

        function p() {}

        function f() {}

        function d() {}
        var g = {};
        l(g, i, (function() {
            return this
        }));
        var k = Object.getPrototypeOf,
            m = k && k(k(T([])));
        m && m !== t && n.call(m, i) && (g = m);
        var y = d.prototype = p.prototype = Object.create(g);

        function x(e) {
            ["next", "throw", "return"].forEach((function(t) {
                l(e, t, (function(e) {
                    return this._invoke(t, e)
                }))
            }))
        }

        function w(e, t) {
            function s(r, i, o, a) {
                var l = h(e[r], e, i);
                if ("throw" !== l.type) {
                    var c = l.arg,
                        u = c.value;
                    return u && "object" == ut(u) && n.call(u, "__await") ? t.resolve(u.__await).then((function(e) {
                        s("next", e, o, a)
                    }), (function(e) {
                        s("throw", e, o, a)
                    })) : t.resolve(u).then((function(e) {
                        c.value = e, o(c)
                    }), (function(e) {
                        return s("throw", e, o, a)
                    }))
                }
                a(l.arg)
            }
            var i;
            r(this, "_invoke", {
                value: function(e, n) {
                    function r() {
                        return new t((function(t, r) {
                            s(e, n, t, r)
                        }))
                    }
                    return i = i ? i.then(r, r) : r()
                }
            })
        }

        function b(e, t, n) {
            var r = "suspendedStart";
            return function(s, i) {
                if ("executing" === r) throw new Error("Generator is already running");
                if ("completed" === r) {
                    if ("throw" === s) throw i;
                    return C()
                }
                for (n.method = s, n.arg = i;;) {
                    var o = n.delegate;
                    if (o) {
                        var a = v(o, n);
                        if (a) {
                            if (a === u) continue;
                            return a
                        }
                    }
                    if ("next" === n.method) n.sent = n._sent = n.arg;
                    else if ("throw" === n.method) {
                        if ("suspendedStart" === r) throw r = "completed", n.arg;
                        n.dispatchException(n.arg)
                    } else "return" === n.method && n.abrupt("return", n.arg);
                    r = "executing";
                    var l = h(e, t, n);
                    if ("normal" === l.type) {
                        if (r = n.done ? "completed" : "suspendedYield", l.arg === u) continue;
                        return {
                            value: l.arg,
                            done: n.done
                        }
                    }
                    "throw" === l.type && (r = "completed", n.method = "throw", n.arg = l.arg)
                }
            }
        }

        function v(e, t) {
            var n = t.method,
                r = e.iterator[n];
            if (void 0 === r) return t.delegate = null, "throw" === n && e.iterator.return && (t.method = "return", t.arg = void 0, v(e, t), "throw" === t
                .method) || "return" !== n && (t.method = "throw", t.arg = new TypeError("The iterator does not provide a '" + n + "' method")), u;
            var s = h(r, e.iterator, t.arg);
            if ("throw" === s.type) return t.method = "throw", t.arg = s.arg, t.delegate = null, u;
            var i = s.arg;
            return i ? i.done ? (t[e.resultName] = i.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null,
                u) : i : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, u)
        }

        function _(e) {
            var t = {
                tryLoc: e[0]
            };
            1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
        }

        function E(e) {
            var t = e.completion || {};
            t.type = "normal", delete t.arg, e.completion = t
        }

        function S(e) {
            this.tryEntries = [{
                tryLoc: "root"
            }], e.forEach(_, this), this.reset(!0)
        }

        function T(e) {
            if (e) {
                var t = e[i];
                if (t) return t.call(e);
                if ("function" == typeof e.next) return e;
                if (!isNaN(e.length)) {
                    var r = -1,
                        s = function t() {
                            for (; ++r < e.length;)
                                if (n.call(e, r)) return t.value = e[r], t.done = !1, t;
                            return t.value = void 0, t.done = !0, t
                        };
                    return s.next = s
                }
            }
            return {
                next: C
            }
        }

        function C() {
            return {
                value: void 0,
                done: !0
            }
        }
        return f.prototype = d, r(y, "constructor", {
            value: d,
            configurable: !0
        }), r(d, "constructor", {
            value: f,
            configurable: !0
        }), f.displayName = l(d, a, "GeneratorFunction"), e.isGeneratorFunction = function(e) {
            var t = "function" == typeof e && e.constructor;
            return !!t && (t === f || "GeneratorFunction" === (t.displayName || t.name))
        }, e.mark = function(e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, d) : (e.__proto__ = d, l(e, a, "GeneratorFunction")), e.prototype = Object.create(y), e
        }, e.awrap = function(e) {
            return {
                __await: e
            }
        }, x(w.prototype), l(w.prototype, o, (function() {
            return this
        })), e.AsyncIterator = w, e.async = function(t, n, r, s, i) {
            void 0 === i && (i = Promise);
            var o = new w(c(t, n, r, s), i);
            return e.isGeneratorFunction(n) ? o : o.next().then((function(e) {
                return e.done ? e.value : o.next()
            }))
        }, x(y), l(y, a, "Generator"), l(y, i, (function() {
            return this
        })), l(y, "toString", (function() {
            return "[object Generator]"
        })), e.keys = function(e) {
            var t = Object(e),
                n = [];
            for (var r in t) n.push(r);
            return n.reverse(),
                function e() {
                    for (; n.length;) {
                        var r = n.pop();
                        if (r in t) return e.value = r, e.done = !1, e
                    }
                    return e.done = !0, e
                }
        }, e.values = T, S.prototype = {
            constructor: S,
            reset: function(e) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this
                    .arg = void 0, this.tryEntries.forEach(E), !e)
                    for (var t in this) "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0)
            },
            stop: function() {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval
            },
            dispatchException: function(e) {
                if (this.done) throw e;
                var t = this;

                function r(n, r) {
                    return o.type = "throw", o.arg = e, t.next = n, r && (t.method = "next", t.arg = void 0), !!r
                }
                for (var s = this.tryEntries.length - 1; s >= 0; --s) {
                    var i = this.tryEntries[s],
                        o = i.completion;
                    if ("root" === i.tryLoc) return r("end");
                    if (i.tryLoc <= this.prev) {
                        var a = n.call(i, "catchLoc"),
                            l = n.call(i, "finallyLoc");
                        if (a && l) {
                            if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                            if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                        } else if (a) {
                            if (this.prev < i.catchLoc) return r(i.catchLoc, !0)
                        } else {
                            if (!l) throw new Error("try statement without catch or finally");
                            if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function(e, t) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var s = this.tryEntries[r];
                    if (s.tryLoc <= this.prev && n.call(s, "finallyLoc") && this.prev < s.finallyLoc) {
                        var i = s;
                        break
                    }
                }
                i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                var o = i ? i.completion : {};
                return o.type = e, o.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, u) : this.complete(o)
            },
            complete: function(e, t) {
                if ("throw" === e.type) throw e.arg;
                return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this
                    .method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), u
            },
            finish: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), E(n), u
                }
            },
            catch: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.tryLoc === e) {
                        var r = n.completion;
                        if ("throw" === r.type) {
                            var s = r.arg;
                            E(n)
                        }
                        return s
                    }
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function(e, t, n) {
                return this.delegate = {
                    iterator: T(e),
                    resultName: t,
                    nextLoc: n
                }, "next" === this.method && (this.arg = void 0), u
            }
        }, e
    }

    function ft(e, t, n, r, s, i, o) {
        try {
            var a = e[i](o),
                l = a.value
        } catch (e) {
            return void n(e)
        }
        a.done ? t(l) : Promise.resolve(l).then(r, s)
    }
    var dt = "",
        gt = function(e, t) {
            var n = parseFloat(getComputedStyle(e).lineHeight);
            e.style.height = "auto", e.style.height = "".concat(e.scrollHeight, "px");
            var r = Math.ceil(e.scrollHeight / n);
            t.className = r < 1 ?
                "elcreative_chat_input_container flex min-h-[58px] w-full flex-row items-center justify-center rounded-full border border-blue-700 bg-white p-2 focus-within:shadow-md" :
                "elcreative_chat_input_container flex min-h-[58px] w-full flex-col items-end justify-center rounded-lg border border-blue-700 bg-white p-2 focus-within:shadow-md"
        },
        kt = function(e) {
            var t = e.querySelectorAll(".chat_prompt"),
                n = e.querySelectorAll(".chat_answer"),
                r = "";
            return t.forEach((function(e, t) {
                r += "User: ".concat(e.textContent.trim(), "\n"), n[t] && (r += "AI: ".concat(n[t].textContent.trim(), "\n"))
            })), r
        },
        mt = function(e) {
            var t = localStorage.getItem("geminiChatHistory"),
                n = e.innerHTML.trim();
            t || localStorage.setItem("geminiChatHistory", n)
        };
    window.bloggerGemini = function(e) {
        var t, n, r = document.querySelector(e.elementContainer);
        if (r) {
            if (null == e.config.apiKey) return void(r.innerHTML += '<p class="mb-4 text-black">Konfigurasi Belum Benar.</p>');
            var s = ht.decrypt(decodeURI(e.config.apiKey).replace(/^\s+/, "").replace(/\s+$/, "") || 0, "root"),
                i = new j(s);
            r.innerHTML =
                '\n        <div class="elcreative_chat_container"></div>\n\n        <div class="elcreative_chat_input_container flex min-h-[58px] w-full flex-row items-center justify-center rounded-full border border-blue-700 bg-white p-2 focus-within:shadow-md">\n            <textarea class="w-full resize-none appearance-none border-transparent bg-transparent px-1.5 outline-none ring-0 text-black" rows="1" placeholder="Apa yang bisa kami bantu hari ini?"></textarea>\n            <button class="relative flex w-auto h-auto cursor-pointer appearance-none rounded-full bg-blue-700 p-2 text-center text-sm text-white shadow transition-shadow hover:shadow-md focus:shadow-md active:shadow-lg" type="button" aria-label="Kirim" title="Kirim">\n                <div class="flex flex-row items-center justify-center">\n                    <svg class="shrink-0 grow-0" viewBox="0 0 24 24" fill="currentColor" height="24" width="24" aria-hidden="true">\n                        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>\n                    </svg>\n                    <span class="sr-only">Kirim</span>\n                </div>\n            </button>\n        </div>\n        '
                .concat(e.config.footer ? "" :
                    '<div class="text-xs text-center mt-2 text-gray-500">Powered by <strong>Gemini</strong>. Developed for <a href="https://blog.bayhaqy.my.id" rel="follow" target="_blank">'
                    .concat(document.querySelector("title").innerText, "</a>.</div>"));
            var o = r.querySelector(".elcreative_chat_container"),
                // --- TAMBAHKAN BLOK KODE INI ---
                (function tampilkanPesanSelamatDatang() {
                    const riwayatTersimpan = localStorage.getItem("geminiChatHistory");
                    if (!riwayatTersimpan) {
                        o.innerHTML = `
                            <div class="chat_answer mb-4 flex">
                                <div class="flex w-full flex-col items-start justify-center rounded-b-lg rounded-tr-lg bg-black/10 px-3 py-2">
                                    <p>Halo! 👋 Saya adalah Bayhaqy AI. Ada yang bisa saya bantu?</p>
                                </div>
                            </div>
                        `;
                        o.classList.add("mb-4");
                    }
                })();
                // ---------------------------------
                
                a = r.querySelector(".elcreative_chat_input_container"),
                l = a.querySelector("textarea"),
                c = a.querySelector("button");
            t = o, (n = localStorage.getItem("geminiChatHistory")) && (t.innerHTML = n), l.addEventListener("input", (function() {
                gt(l, a)
            })), c.addEventListener("click", function() {
                var e, t = (e = pt().mark((function e(t) {
                    var n, r, s, h, u, p, f;
                    return pt().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (t.preventDefault(), n = l.value.trim(), r = o.querySelectorAll(".chat_answer"),
                                    (s = r[r.length - 1]) && s.scrollIntoView({
                                        behavior: "smooth",
                                        block: "end"
                                    }), !n) {
                                    e.next = 37;
                                    break
                                }
                                return dt = kt(o), dt += "User: ".concat(n, "\n"), c.classList.toggle("hidden", !0),
                                    c.classList.toggle("flex", !1), l.value = "", gt(l, a), o.innerHTML +=
                                    '\n                <div class="chat_prompt mb-4 flex flex-row items-center justify-between">\n                    <div class=""></div>\n                    <div class="flex flex-col items-end justify-center rounded-b-lg rounded-tl-lg bg-blue-700/20 px-3">\n                        <div class="w-auto">\n                            <p>'
                                    .concat(n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"),
                                        '</p>\n                        </div>\n                        <div class="text-xs text-gray-500"></div>\n                    </div>\n                </div>'
                                        ), e.prev = 13, e.next = 16, i.getGenerativeModel({
                                        model: "gemini-1.5-flash-latest",
                                        // TAMBAHKAN BAGIAN INI
                                        systemInstruction: "Anda adalah asisten AI yang ramah dan sangat membantu di https://blog.bayhaqy.my.id/. Tugas utama Anda adalah membantu pengunjung mempelajari dan mencari informasi yang ada di dalam artikel-artikel di website ini. Selalu prioritaskan jawaban berdasarkan informasi dari website. Jika informasi tidak ditemukan di website atau pertanyaannya bersifat umum, Anda boleh menggunakan pengetahuan umum Anda untuk menjawab. Jawablah selalu dalam bahasa yang sopan dan jelas, sesuaikan jawaban bahasa tergantung dari pertanyaan. Kamu berhak menolak jika ragu akan jawabanmu.",
                                        parameters: {
                                            temperature: .7,
                                            max_tokens: 150,
                                            top_p: .9,
                                            top_k: 50,
                                            frequency_penalty: 0,
                                            presence_penalty: 0
                                        }
                                    });
                            case 16:
                                return h = e.sent, e.next = 19, h.generateContent(dt + "AI:");
                            case 19:
                                return u = e.sent, e.next = 22, u.response.text();
                            case 22:
                                p = e.sent, f = Ve(p), o.innerHTML +=
                                    '\n                    <div class="chat_answer mb-4 flex flex-row items-center justify-between">\n                        <div class="flex w-full flex-col items-end justify-center rounded-b-lg rounded-tr-lg bg-black/10 px-3">\n                            <div class="w-full overflow-x-auto">\n                                '
                                    .concat(f,
                                        '\n                            </div>\n                            <div class="text-xs text-gray-500"></div>\n                            <div class=""></div>\n                        </div>\n                    </div>'
                                        ), o.classList.add("mb-4"), mt(o), c.classList.toggle("hidden", !1), c
                                    .classList.toggle("flex", !0), o.lastChild.scrollIntoView({
                                        behavior: "smooth",
                                        block: "end"
                                    }), e.next = 35;
                                break;
                            case 32:
                                e.prev = 32, e.t0 = e.catch(13), o.innerHTML +=
                                    '<p class="mb-4 text-black">Terjadi Kesalahan: '.concat(e.t0, "</p>");
                            case 35:
                                e.next = 39;
                                break;
                            case 37:
                                o.innerHTML +=
                                    '<p class="mb-4 text-black">Harap Masukkan Pertanyaan Anda terlebih dahulu.</p>',
                                    l.focus();
                            case 39:
                            case "end":
                                return e.stop()
                        }
                    }), e, null, [
                        [13, 32]
                    ])
                })), function() {
                    var t = this,
                        n = arguments;
                    return new Promise((function(r, s) {
                        var i = e.apply(t, n);

                        function o(e) {
                            ft(i, r, s, o, a, "next", e)
                        }

                        function a(e) {
                            ft(i, r, s, o, a, "throw", e)
                        }
                        o(void 0)
                    }))
                });
                return function(e) {
                    return t.apply(this, arguments)
                }
            }())
        }
    }
}();
