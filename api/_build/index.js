var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React;
var init_react = __esm({
  "node_modules/@remix-run/dev/compiler/shims/react.ts"() {
    React = __toESM(require("react"));
  }
});

// route:/Users/newll/Desktop/portfolio/app/routes/upload.tsx
var require_upload = __commonJS({
  "route:/Users/newll/Desktop/portfolio/app/routes/upload.tsx"() {
    init_react();
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});
init_react();

// server-entry-module:@remix-run/dev/server-build
init_react();

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
init_react();
var import_react = require("@remix-run/react");
var import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/newll/Desktop/portfolio/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
init_react();
var import_node2 = require("@remix-run/node");
var import_react2 = require("@remix-run/react");

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-777BLKOP.css";

// app/session.server.ts
init_react();
var import_node = require("@remix-run/node");
var import_tiny_invariant = __toESM(require("tiny-invariant"));

// app/models/user.server.ts
init_react();
var import_bcryptjs = __toESM(require("bcryptjs"));

// app/db.server.ts
init_react();
var import_client = require("@prisma/client");
var prisma;
if (false) {
  prisma = new import_client.PrismaClient();
} else {
  if (!global.__db__) {
    global.__db__ = new import_client.PrismaClient();
  }
  prisma = global.__db__;
  prisma.$connect();
}

// app/models/user.server.ts
async function getUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}
async function getUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}
async function createUser(email, password) {
  const hashedPassword = await import_bcryptjs.default.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword
    }
  });
}
async function verifyLogin(email, password) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email }
  });
  if (!userWithPassword || !userWithPassword.passwordHash) {
    return null;
  }
  const isValid = await import_bcryptjs.default.compare(password, userWithPassword.passwordHash);
  if (!isValid) {
    return null;
  }
  const _a = userWithPassword, { passwordHash: _password } = _a, userWithoutPassword = __objRest(_a, ["passwordHash"]);
  return userWithoutPassword;
}

// app/session.server.ts
(0, import_tiny_invariant.default)(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
var sessionStorage = (0, import_node.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: false
  }
});
var USER_SESSION_KEY = "userId";
async function getSession(request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getUserId(request) {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return userId;
}
async function getUser(request) {
  const userId = await getUserId(request);
  if (userId === void 0)
    return null;
  const user = await getUserById(userId);
  if (user)
    return user;
  throw await logout(request);
}
async function createUserSession({
  request,
  userId,
  remember,
  redirectTo
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  return (0, import_node.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember ? 60 * 60 * 24 * 7 : void 0
      })
    }
  });
}
async function logout(request) {
  const session = await getSession(request);
  return (0, import_node.redirect)("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}

// route:/Users/newll/Desktop/portfolio/app/root.tsx
var links = () => {
  return [
    { rel: "stylesheet", href: tailwind_default },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;600&family=Montserrat:wght@600&display=swap"
    }
  ];
};
var meta = () => ({
  charset: "utf-8",
  title: "Den Davydov",
  viewport: "width=device-width,initial-scale=1"
});
var loader = async ({ request }) => {
  return (0, import_node2.json)({
    user: await getUser(request)
  });
};
function App() {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en",
    className: "h-full"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react2.Meta, null), /* @__PURE__ */ React.createElement(import_react2.Links, null)), /* @__PURE__ */ React.createElement("body", {
    className: "h-full"
  }, /* @__PURE__ */ React.createElement(import_react2.Outlet, null), /* @__PURE__ */ React.createElement(import_react2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react2.Scripts, null), /* @__PURE__ */ React.createElement(import_react2.LiveReload, null)));
}

// route:/Users/newll/Desktop/portfolio/app/routes/healthcheck.tsx
var healthcheck_exports = {};
__export(healthcheck_exports, {
  loader: () => loader2
});
init_react();
var loader2 = async ({ request }) => {
  const host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  try {
    const url = new URL("/", `http://${host}`);
    await Promise.all([
      prisma.user.count(),
      fetch(url.toString(), { method: "HEAD" }).then((r) => {
        if (!r.ok)
          return Promise.reject(r);
      })
    ]);
    return new Response("OK");
  } catch (error) {
    console.log("healthcheck \u274C", { error });
    return new Response("ERROR", { status: 500 });
  }
};

// route:/Users/newll/Desktop/portfolio/app/routes/blog/$post.tsx
var post_exports = {};
__export(post_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  action: () => action,
  default: () => NoteDetailsPage,
  loader: () => loader3
});
init_react();
var import_node3 = require("@remix-run/node");
var import_react3 = require("@remix-run/react");
var import_tiny_invariant2 = __toESM(require("tiny-invariant"));
var import_react_syntax_highlighter = __toESM(require("react-syntax-highlighter"));
var import_docco = require("react-syntax-highlighter/dist/cjs/styles/hljs/docco");
var import_html_entities = require("html-entities");

// app/models/post.server.ts
init_react();
function getPost({ id }) {
  return prisma.post.findFirst({
    where: { id }
  });
}
function getPostListItems() {
  return prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      tags: true
    },
    orderBy: { updatedAt: "desc" }
  });
}
function createPost({
  content,
  title,
  tags
}) {
  return prisma.post.create({
    data: {
      title,
      content,
      tags
    }
  });
}
function deletePost({ id }) {
  return prisma.post.deleteMany({
    where: { id }
  });
}

// app/modules/blog/media/test.png
var test_default = "/build/_assets/test-ZDVCWVVD.png";

// public/logo.svg
var logo_default = "/build/_assets/logo-XDBE6HHO.svg";

// route:/Users/newll/Desktop/portfolio/app/routes/blog/$post.tsx
function parseHTML(tag, value) {
  switch (tag) {
    case "p":
      return /* @__PURE__ */ React.createElement("p", null, value);
    case "h1":
      return /* @__PURE__ */ React.createElement("h1", null, value);
    case "h2":
      return /* @__PURE__ */ React.createElement("h2", null, value);
    case "h3":
      return /* @__PURE__ */ React.createElement("h3", null, value);
    case "img":
      return /* @__PURE__ */ React.createElement("img", {
        src: value,
        alt: value
      });
    case "div":
      return /* @__PURE__ */ React.createElement("div", null, value);
    case "code":
      return /* @__PURE__ */ React.createElement(import_react_syntax_highlighter.default, {
        language: "javascript",
        style: import_docco.docco
      }, (0, import_html_entities.decode)(value));
    default:
      throw new Error(`We don't know this tag: ${tag}`);
  }
}
var loader3 = async ({ request, params }) => {
  (0, import_tiny_invariant2.default)(params.post, "post not found");
  const post = await getPost({ id: params.post });
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return (0, import_node3.json)({ post });
};
var action = async ({ request, params }) => {
  (0, import_tiny_invariant2.default)(params.post, "post not found");
  await deletePost({ id: params.post });
  return (0, import_node3.redirect)("/");
};
function NoteDetailsPage() {
  const { post } = (0, import_react3.useLoaderData)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "bg-white"
  }, /* @__PURE__ */ React.createElement("section", {
    className: "mx-auto max-w-[57%]"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "relative h-16 w-full"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "fixed z-40 flex h-20 w-full justify-between bg-white"
  }, /* @__PURE__ */ React.createElement("nav", {
    className: "m-auto w-full items-center justify-between px-5 md:flex "
  }, /* @__PURE__ */ React.createElement(import_react3.Link, {
    to: "/"
  }, /* @__PURE__ */ React.createElement("img", {
    src: logo_default,
    alt: "Logotype",
    width: "40",
    height: "40"
  }))))), /* @__PURE__ */ React.createElement("main", {
    className: "w-full"
  }, /* @__PURE__ */ React.createElement("article", {
    className: "px-5 pt-12 pb-28"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "text-3xl font-bold capitalize text-black"
  }, post.title), post.tags.map((tag) => /* @__PURE__ */ React.createElement("small", {
    key: tag,
    className: "pointer mt-3 mr-3 inline-block rounded-sm bg-yellow px-1.5 text-sm text-black"
  }, tag)), /* @__PURE__ */ React.createElement("img", {
    src: test_default,
    alt: "Test",
    className: "my-10"
  }), post.content.map((contentItem) => /* @__PURE__ */ React.createElement("div", {
    key: contentItem.id,
    className: "my-4 text-base	leading-7	"
  }, parseHTML(contentItem.tag, contentItem.value)))))));
}
function ErrorBoundary({ error }) {
  console.error(error);
  return /* @__PURE__ */ React.createElement("div", null, "An unexpected error occurred: ", error.message);
}
function CatchBoundary() {
  const caught = (0, import_react3.useCatch)();
  if (caught.status === 404) {
    return /* @__PURE__ */ React.createElement("div", null, "Note not found");
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// route:/Users/newll/Desktop/portfolio/app/routes/blog/index.tsx
var blog_exports = {};
__export(blog_exports, {
  default: () => Index,
  loader: () => loader4
});
init_react();

// app/components/menu.tsx
init_react();
var import_react4 = require("@remix-run/react");
var MENU = [
  {
    name: "About",
    link: "/about",
    auth: false
  },
  {
    name: "Blog",
    link: "/blog",
    auth: false
  },
  {
    name: "Contact",
    link: "/contact",
    auth: false
  },
  {
    name: "Add a post",
    link: "/new",
    auth: true
  }
];
function Menu({ user }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex h-16 items-center justify-between py-6 px-20"
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_react4.Link, {
    to: "/"
  }, /* @__PURE__ */ React.createElement("img", {
    src: logo_default,
    alt: "Logotype",
    width: "40",
    height: "40"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-between"
  }, /* @__PURE__ */ React.createElement("div", null, MENU.map((menuItem, idx) => {
    if (menuItem.auth && !user) {
      return null;
    }
    return /* @__PURE__ */ React.createElement(import_react4.Link, {
      to: menuItem.link,
      key: menuItem.link,
      className: `mr-12 text-xl font-semibold	font-text ${idx === MENU.length - 1 && "mr-0"}`
    }, menuItem.name);
  }))));
}

// app/utils.ts
init_react();
var import_react5 = require("@remix-run/react");
var import_react6 = require("react");
var DEFAULT_REDIRECT = "/";
function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }
  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }
  return to;
}
function useMatchesData(id) {
  const matchingRoutes = (0, import_react5.useMatches)();
  const route = (0, import_react6.useMemo)(() => matchingRoutes.find((route2) => route2.id === id), [matchingRoutes, id]);
  return route == null ? void 0 : route.data;
}
function isUser(user) {
  return user && typeof user === "object" && typeof user.email === "string";
}
function useOptionalUser() {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return void 0;
  }
  return data.user;
}
function validateEmail(email) {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}
function formatDateTime(date) {
  const yyyy = date.getFullYear();
  const mm = date.toLocaleString("default", { month: "long" });
  const dd = date.getDate();
  return mm + " " + dd + " " + yyyy;
}

// route:/Users/newll/Desktop/portfolio/app/routes/blog/index.tsx
var import_server_runtime = require("@remix-run/server-runtime");
var import_react9 = require("@remix-run/react");

// app/modules/blog/index.tsx
init_react();
var import_react8 = require("react");

// app/components/post.tsx
init_react();
var import_react7 = require("@remix-run/react");
function BlogPost({
  to = "",
  title = "",
  description = "",
  image = "",
  createdAt = "",
  tags = [""]
}) {
  return /* @__PURE__ */ React.createElement(import_react7.Link, {
    to,
    className: "flex justify-between"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-[75%]"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "color-black font-title text-3xl"
  }, title), /* @__PURE__ */ React.createElement("p", null, description)), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, /* @__PURE__ */ React.createElement("time", {
    className: "font-text text-lg	font-light tracking-wide"
  }, createdAt), /* @__PURE__ */ React.createElement("p", {
    className: "mt-auto rounded-sm bg-yellow px-1.5 py-3 text-center font-text text-sm text-black"
  }, tags)));
}

// app/modules/blog/index.tsx
var TAGS = ["Java Script", "Node", "React"];
function Blog({ posts }) {
  const [activeFilter, setActiveFilter] = (0, import_react8.useState)("all");
  const [search, setSearch] = (0, import_react8.useState)("");
  return /* @__PURE__ */ React.createElement("section", {
    className: "flex justify-between"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full max-w-sm"
  }, /* @__PURE__ */ React.createElement("form", {
    method: "post"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "search",
    placeholder: "Search a post",
    value: search,
    onChange: (e) => {
      setSearch(e.target.value);
    }
  })), /* @__PURE__ */ React.createElement("ul", null, TAGS.map((tag) => /* @__PURE__ */ React.createElement("li", {
    key: tag
  }, /* @__PURE__ */ React.createElement("button", {
    className: tag === activeFilter ? "border-2" : "border-0",
    onClick: () => {
      if (activeFilter === tag)
        return setActiveFilter("all");
      return setActiveFilter(tag);
    }
  }, tag))))), /* @__PURE__ */ React.createElement("div", {
    className: "flex w-full max-w-3xl flex-wrap divide-y-2"
  }, posts.map(({ id, title, content, createdAt, tags }) => {
    var _a;
    if (activeFilter === "all" || tags.includes(activeFilter)) {
      return title.includes(search) && /* @__PURE__ */ React.createElement("div", {
        className: "mb-4 w-full py-4",
        key: id
      }, /* @__PURE__ */ React.createElement(BlogPost, {
        to: id,
        title,
        description: (_a = content[0]) == null ? void 0 : _a.value,
        createdAt: formatDateTime(new Date(createdAt)),
        tags
      }));
    }
  })));
}

// route:/Users/newll/Desktop/portfolio/app/routes/blog/index.tsx
var loader4 = async ({ request }) => {
  const posts = await getPostListItems();
  return (0, import_server_runtime.json)({ posts });
};
function Index() {
  const { posts } = (0, import_react9.useLoaderData)();
  const user = useOptionalUser();
  return /* @__PURE__ */ React.createElement("main", {
    className: "bg-whip px-14 pt-7 min-h-screen"
  }, /* @__PURE__ */ React.createElement(Menu, {
    user
  }), /* @__PURE__ */ React.createElement("section", {
    className: "mt-20 px-20"
  }, /* @__PURE__ */ React.createElement(Blog, {
    posts
  })));
}

// route:/Users/newll/Desktop/portfolio/app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action2,
  loader: () => loader5
});
init_react();
var import_node4 = require("@remix-run/node");
var action2 = async ({ request }) => {
  return logout(request);
};
var loader5 = async () => {
  return (0, import_node4.redirect)("/");
};

// server-entry-module:@remix-run/dev/server-build
var route5 = __toESM(require_upload());

// route:/Users/newll/Desktop/portfolio/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index2,
  loader: () => loader6
});
init_react();
var import_server_runtime2 = require("@remix-run/server-runtime");
var import_react10 = require("@remix-run/react");

// public/author_photo.jpg
var author_photo_default = "/build/_assets/author_photo-YU27NVH4.jpg";

// public/myDuo.png
var myDuo_default = "/build/_assets/myDuo-PGYAQ65E.png";

// route:/Users/newll/Desktop/portfolio/app/routes/index.tsx
var SOCIAL = [
  {
    abbr: "GitHub",
    name: "GH",
    link: ""
  },
  {
    abbr: "Twitter",
    name: "TW",
    link: ""
  },
  {
    abbr: "Instagram",
    name: "IG",
    link: ""
  },
  {
    abbr: "LinkedIn",
    name: "LI",
    link: ""
  },
  {
    abbr: "Dev.to",
    name: "DV",
    link: ""
  },
  {
    abbr: "YouTube",
    name: "YT",
    link: ""
  }
];
var PROJECTS = [
  {
    title: "myDuo",
    link: "https://my-duo.vercel.app/",
    img: myDuo_default,
    description: `Literally it's a clone of Duolingo.com, but with a little change: you can create your own exercises and practice them.`,
    technologies: ["React", "Prisma", "MongoDB", "TS", "Vercel"]
  }
];
var loader6 = async ({ request }) => {
  const posts = await getPostListItems();
  return (0, import_server_runtime2.json)({ posts });
};
function Index2() {
  const { posts } = (0, import_react10.useLoaderData)();
  const user = useOptionalUser();
  return /* @__PURE__ */ React.createElement("main", {
    className: "min-h-screen bg-whip px-14 pt-7"
  }, /* @__PURE__ */ React.createElement(Menu, {
    user
  }), /* @__PURE__ */ React.createElement("section", {
    className: "mt-20 flex justify-between px-20"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-lr py-20"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "font-title text-6xl text-black",
    style: { margin: "0.67em 0" }
  }, "Hey I'm Denis Davydov"), /* @__PURE__ */ React.createElement("p", {
    className: "font-text text-2xl"
  }, "I\u2019m a web developer and content creator based in Finland."), /* @__PURE__ */ React.createElement("ul", {
    className: "mt-6 flex"
  }, SOCIAL.map((social_item) => /* @__PURE__ */ React.createElement("li", {
    key: social_item.name
  }, /* @__PURE__ */ React.createElement("abbr", {
    title: "",
    className: "pr-5 no-underline"
  }, /* @__PURE__ */ React.createElement(import_react10.Link, {
    to: social_item.link,
    className: "font-text text-2xl	font-semibold text-black"
  }, social_item.name)))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("img", {
    src: author_photo_default,
    alt: "Den Davydov",
    className: "w-auto max-w-sm rounded-full"
  }))), /* @__PURE__ */ React.createElement("section", {
    className: "my-20 p-20"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-between"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "font-title text-4xl"
  }, "Latest Posts"), /* @__PURE__ */ React.createElement(import_react10.Link, {
    to: "/blog",
    className: "text-2xl"
  }, "See all")), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-wrap justify-between"
  }, posts.map(({ id, title, content, createdAt, tags }) => {
    var _a;
    return /* @__PURE__ */ React.createElement("div", {
      className: "mt-12 w-full max-w-lg",
      key: id
    }, /* @__PURE__ */ React.createElement(BlogPost, {
      to: `blog/${id}`,
      title,
      description: (_a = content[0]) == null ? void 0 : _a.value,
      createdAt: formatDateTime(new Date(createdAt)),
      tags
    }));
  }))), /* @__PURE__ */ React.createElement("section", {
    className: "my-20 p-20"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "mb-10 font-title text-4xl"
  }, "Latest Projects"), PROJECTS.map((project) => /* @__PURE__ */ React.createElement("div", {
    key: project.title,
    className: "flex"
  }, /* @__PURE__ */ React.createElement("a", {
    href: project.link,
    className: "w-3/6",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React.createElement("img", {
    src: project.img,
    alt: project.title
  })), /* @__PURE__ */ React.createElement("div", {
    className: "pl-5"
  }, /* @__PURE__ */ React.createElement("a", {
    href: project.link,
    className: "font-title text-3xl",
    target: "_blank",
    rel: "noreferrer"
  }, project.title), /* @__PURE__ */ React.createElement("p", {
    className: "my-3 font-text text-xl"
  }, project.description), /* @__PURE__ */ React.createElement("p", null, "Technologies used: "), /* @__PURE__ */ React.createElement("ul", {
    className: "mt-3 flex flex-wrap"
  }, project.technologies.map((tech) => /* @__PURE__ */ React.createElement("li", {
    key: tech,
    className: "pr-3"
  }, tech))))))), /* @__PURE__ */ React.createElement("section", {
    className: "my-20 flex flex-col justify-center p-20"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "mb-10 text-center font-title text-4xl"
  }, "Get In Touch"), /* @__PURE__ */ React.createElement("p", {
    className: "mb-8 text-center"
  }, "Currently I'm looking for a job as Frontend or Fullstack web developer."), /* @__PURE__ */ React.createElement("a", {
    href: "mailto:qepttt@gmail.com",
    className: "mx-auto bg-red p-5 font-semibold text-white"
  }, "Say Hello")));
}

// route:/Users/newll/Desktop/portfolio/app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action3,
  default: () => LoginPage,
  loader: () => loader7,
  meta: () => meta2
});
init_react();
var import_node5 = require("@remix-run/node");
var import_react11 = require("@remix-run/react");
var React2 = __toESM(require("react"));
var loader7 = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId)
    return (0, import_node5.redirect)("/");
  return (0, import_node5.json)({});
};
var action3 = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/notes");
  const remember = formData.get("remember");
  if (!validateEmail(email)) {
    return (0, import_node5.json)({ errors: { email: "Email is invalid" } }, { status: 400 });
  }
  if (typeof password !== "string") {
    return (0, import_node5.json)({ errors: { password: "Password is required" } }, { status: 400 });
  }
  if (password.length < 8) {
    return (0, import_node5.json)({ errors: { password: "Password is too short" } }, { status: 400 });
  }
  const user = await verifyLogin(email, password);
  if (!user) {
    return (0, import_node5.json)({ errors: { email: "Invalid email or password" } }, { status: 400 });
  }
  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo
  });
};
var meta2 = () => {
  return {
    title: "Login"
  };
};
function LoginPage() {
  var _a, _b, _c, _d;
  const [searchParams] = (0, import_react11.useSearchParams)();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const actionData = (0, import_react11.useActionData)();
  const emailRef = React2.useRef(null);
  const passwordRef = React2.useRef(null);
  React2.useEffect(() => {
    var _a2, _b2, _c2, _d2;
    if ((_a2 = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a2.email) {
      (_b2 = emailRef.current) == null ? void 0 : _b2.focus();
    } else if ((_c2 = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _c2.password) {
      (_d2 = passwordRef.current) == null ? void 0 : _d2.focus();
    }
  }, [actionData]);
  return /* @__PURE__ */ React2.createElement("div", {
    className: "flex min-h-full flex-col justify-center"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "mx-auto w-full max-w-md px-8"
  }, /* @__PURE__ */ React2.createElement(import_react11.Form, {
    method: "post",
    className: "space-y-6"
  }, /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement("label", {
    htmlFor: "email",
    className: "text-gray-700 block text-sm font-medium"
  }, "Email address"), /* @__PURE__ */ React2.createElement("div", {
    className: "mt-1"
  }, /* @__PURE__ */ React2.createElement("input", {
    ref: emailRef,
    id: "email",
    required: true,
    autoFocus: true,
    name: "email",
    type: "email",
    autoComplete: "email",
    "aria-invalid": ((_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.email) ? true : void 0,
    "aria-describedby": "email-error",
    className: "border-gray-500 w-full rounded border px-2 py-1 text-lg"
  }), ((_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.email) && /* @__PURE__ */ React2.createElement("div", {
    className: "text-red-700 pt-1",
    id: "email-error"
  }, actionData.errors.email))), /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement("label", {
    htmlFor: "password",
    className: "text-gray-700 block text-sm font-medium"
  }, "Password"), /* @__PURE__ */ React2.createElement("div", {
    className: "mt-1"
  }, /* @__PURE__ */ React2.createElement("input", {
    id: "password",
    ref: passwordRef,
    name: "password",
    type: "password",
    autoComplete: "current-password",
    "aria-invalid": ((_c = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _c.password) ? true : void 0,
    "aria-describedby": "password-error",
    className: "border-gray-500 w-full rounded border px-2 py-1 text-lg"
  }), ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.password) && /* @__PURE__ */ React2.createElement("div", {
    className: "text-red-700 pt-1",
    id: "password-error"
  }, actionData.errors.password))), /* @__PURE__ */ React2.createElement("input", {
    type: "hidden",
    name: "redirectTo",
    value: redirectTo
  }), /* @__PURE__ */ React2.createElement("button", {
    type: "submit",
    className: "bg-blue-500 hover:bg-blue-600 focus:bg-blue-400  w-full rounded py-2 px-4 text-white"
  }, "Log in"), /* @__PURE__ */ React2.createElement("div", {
    className: "flex items-center justify-between"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "flex items-center"
  }, /* @__PURE__ */ React2.createElement("input", {
    id: "remember",
    name: "remember",
    type: "checkbox",
    className: "border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4 rounded"
  }), /* @__PURE__ */ React2.createElement("label", {
    htmlFor: "remember",
    className: "text-gray-900 ml-2 block text-sm"
  }, "Remember me")), /* @__PURE__ */ React2.createElement("div", {
    className: "text-gray-500 text-center text-sm"
  }, "Don't have an account?", " ", /* @__PURE__ */ React2.createElement(import_react11.Link, {
    className: "text-blue-500 underline",
    to: {
      pathname: "/join",
      search: searchParams.toString()
    }
  }, "Sign up"))))));
}

// route:/Users/newll/Desktop/portfolio/app/routes/join.tsx
var join_exports = {};
__export(join_exports, {
  action: () => action4,
  default: () => Join,
  loader: () => loader8,
  meta: () => meta3
});
init_react();
var import_node6 = require("@remix-run/node");
var import_react12 = require("@remix-run/react");
var React3 = __toESM(require("react"));
var loader8 = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId)
    return (0, import_node6.redirect)("/");
  return (0, import_node6.json)({});
};
var action4 = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  if (!validateEmail(email)) {
    return (0, import_node6.json)({ errors: { email: "Email is invalid" } }, { status: 400 });
  }
  if (typeof password !== "string") {
    return (0, import_node6.json)({ errors: { password: "Password is required" } }, { status: 400 });
  }
  if (password.length < 8) {
    return (0, import_node6.json)({ errors: { password: "Password is too short" } }, { status: 400 });
  }
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return (0, import_node6.json)({ errors: { email: "A user already exists with this email" } }, { status: 400 });
  }
  const user = await createUser(email, password);
  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo
  });
};
var meta3 = () => {
  return {
    title: "Sign Up"
  };
};
function Join() {
  var _a, _b, _c, _d;
  const [searchParams] = (0, import_react12.useSearchParams)();
  const redirectTo = searchParams.get("redirectTo") ?? void 0;
  const actionData = (0, import_react12.useActionData)();
  const emailRef = React3.useRef(null);
  const passwordRef = React3.useRef(null);
  React3.useEffect(() => {
    var _a2, _b2, _c2, _d2;
    if ((_a2 = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a2.email) {
      (_b2 = emailRef.current) == null ? void 0 : _b2.focus();
    } else if ((_c2 = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _c2.password) {
      (_d2 = passwordRef.current) == null ? void 0 : _d2.focus();
    }
  }, [actionData]);
  return /* @__PURE__ */ React3.createElement("div", {
    className: "flex min-h-full flex-col justify-center"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "mx-auto w-full max-w-md px-8"
  }, /* @__PURE__ */ React3.createElement(import_react12.Form, {
    method: "post",
    className: "space-y-6"
  }, /* @__PURE__ */ React3.createElement("div", null, /* @__PURE__ */ React3.createElement("label", {
    htmlFor: "email",
    className: "block text-sm font-medium text-gray-700"
  }, "Email address"), /* @__PURE__ */ React3.createElement("div", {
    className: "mt-1"
  }, /* @__PURE__ */ React3.createElement("input", {
    ref: emailRef,
    id: "email",
    required: true,
    autoFocus: true,
    name: "email",
    type: "email",
    autoComplete: "email",
    "aria-invalid": ((_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.email) ? true : void 0,
    "aria-describedby": "email-error",
    className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
  }), ((_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.email) && /* @__PURE__ */ React3.createElement("div", {
    className: "pt-1 text-red-700",
    id: "email-error"
  }, actionData.errors.email))), /* @__PURE__ */ React3.createElement("div", null, /* @__PURE__ */ React3.createElement("label", {
    htmlFor: "password",
    className: "block text-sm font-medium text-gray-700"
  }, "Password"), /* @__PURE__ */ React3.createElement("div", {
    className: "mt-1"
  }, /* @__PURE__ */ React3.createElement("input", {
    id: "password",
    ref: passwordRef,
    name: "password",
    type: "password",
    autoComplete: "new-password",
    "aria-invalid": ((_c = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _c.password) ? true : void 0,
    "aria-describedby": "password-error",
    className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
  }), ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.password) && /* @__PURE__ */ React3.createElement("div", {
    className: "pt-1 text-red-700",
    id: "password-error"
  }, actionData.errors.password))), /* @__PURE__ */ React3.createElement("input", {
    type: "hidden",
    name: "redirectTo",
    value: redirectTo
  }), /* @__PURE__ */ React3.createElement("button", {
    type: "submit",
    className: "w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
  }, "Create Account"), /* @__PURE__ */ React3.createElement("div", {
    className: "flex items-center justify-center"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "text-center text-sm text-gray-500"
  }, "Already have an account?", " ", /* @__PURE__ */ React3.createElement(import_react12.Link, {
    className: "text-blue-500 underline",
    to: {
      pathname: "/login",
      search: searchParams.toString()
    }
  }, "Log in"))))));
}

// route:/Users/newll/Desktop/portfolio/app/routes/new.tsx
var new_exports = {};
__export(new_exports, {
  action: () => action5,
  default: () => NewPostPage
});
init_react();
var import_node7 = require("@remix-run/node");
var import_react18 = require("@remix-run/react");
var import_nanoid2 = require("nanoid");

// app/modules/editor/index.tsx
init_react();
var import_react17 = require("react");

// app/modules/editor/components/content-block.tsx
init_react();

// app/modules/editor/components/code-block/code-block.tsx
init_react();
var import_react13 = require("react");
var import_react_textarea_autosize = __toESM(require("react-textarea-autosize"));
var import_react_syntax_highlighter2 = __toESM(require("react-syntax-highlighter"));
var import_docco2 = require("react-syntax-highlighter/dist/cjs/styles/hljs/docco");
var import_html_entities2 = require("html-entities");
function CodeBlock({
  initialValue = "",
  refName,
  name,
  setFocusOnPreviousContent,
  addContent
}) {
  const [value, setValue] = (0, import_react13.useState)(initialValue);
  const [decodedValue, setDecodedValue] = (0, import_react13.useState)(initialValue);
  (0, import_react13.useEffect)(() => {
    if (refName.target) {
      refName.target.style.height = `${refName.target.scrollHeight}px`;
    }
  }, [refName, value]);
  return /* @__PURE__ */ React.createElement(import_react13.Fragment, null, /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name,
    value: (0, import_html_entities2.encode)(value)
  }), /* @__PURE__ */ React.createElement(import_react_textarea_autosize.default, {
    minRows: 1,
    ref: refName,
    value,
    onChange: (evt) => {
      setValue(evt.target.value);
    },
    onKeyDown: (evt) => {
      const target = evt.target;
      if (evt.code === "Backspace" && target.value.length === 0) {
        evt.preventDefault();
        setFocusOnPreviousContent();
      }
    },
    className: "w-full resize-none text-xl focus:outline-none",
    onFocus: (e) => {
      return e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length);
    },
    onBlur: (e) => e.target.placeholder = ""
  }), /* @__PURE__ */ React.createElement(import_react_syntax_highlighter2.default, {
    language: "javascript",
    style: import_docco2.docco
  }, value));
}

// app/modules/editor/components/input-block.tsx
init_react();
function StudyInput({
  initialValue,
  placeholder,
  refName,
  name
}) {
  return /* @__PURE__ */ React.createElement("input", {
    type: "text",
    defaultValue: initialValue,
    placeholder,
    className: "w-full focus:outline-none",
    ref: refName,
    name,
    autoComplete: "off"
  });
}

// app/modules/editor/components/input-image.tsx
init_react();
var import_react14 = require("react");
function InputImage({ name }) {
  const [img, setImg] = (0, import_react14.useState)({ src: "", alt: "" });
  return /* @__PURE__ */ React.createElement(import_react14.Fragment, null, /* @__PURE__ */ React.createElement("input", {
    className: img.src && "hidden",
    type: "file",
    name,
    onChange: (event) => {
      if (event.target.files && event.target.files[0]) {
        const img2 = event.target.files[0];
        setImg({
          src: URL.createObjectURL(img2),
          alt: event.target.files[0].name
        });
      }
    }
  }), /* @__PURE__ */ React.createElement("img", {
    src: img.src,
    alt: img.alt
  }));
}

// app/modules/editor/components/text-block/text-block.tsx
init_react();
var import_react15 = require("react");
var import_react_textarea_autosize2 = __toESM(require("react-textarea-autosize"));
function TextBlock({
  initialValue = "",
  refName,
  name,
  setFocusOnPreviousContent,
  addContent
}) {
  const [value, setValue] = (0, import_react15.useState)(initialValue);
  (0, import_react15.useEffect)(() => {
    if (refName.target) {
      refName.target.style.height = `${refName.target.scrollHeight}px`;
    }
  }, [refName, value]);
  (0, import_react15.useEffect)(() => {
    if (value.startsWith("# ")) {
      setValue("");
      addContent({ tag: "h1", value: "" });
    }
    if (value.startsWith("## ")) {
      setValue("");
      addContent({ tag: "h2", value: "" });
    }
    if (value.startsWith("### ")) {
      setValue("");
      addContent({ tag: "h3", value: "" });
    }
  }, [value, addContent]);
  return /* @__PURE__ */ React.createElement(import_react_textarea_autosize2.default, {
    minRows: 1,
    ref: refName,
    value,
    onChange: (evt) => {
      setValue(evt.target.value);
    },
    onKeyDown: (evt) => {
      const target = evt.target;
      if (evt.code === "Backspace" && target.value.length === 0) {
        evt.preventDefault();
        setFocusOnPreviousContent();
      }
    },
    className: "w-full text-xl focus:outline-none resize-none",
    name,
    onFocus: (e) => {
      e.target.placeholder = `Type '/' for commands`;
      return e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length);
    },
    onBlur: (e) => e.target.placeholder = ""
  });
}

// app/modules/editor/components/content-block.tsx
function formatContent(tag, value, refName, setFocusOnPreviousContent, setFocusOnNextContent, addContent, id) {
  switch (tag) {
    case "h1":
      return /* @__PURE__ */ React.createElement("h1", {
        className: "font-title text-3xl"
      }, /* @__PURE__ */ React.createElement(StudyInput, {
        initialValue: value,
        placeholder: "Heading 1",
        name: "h1",
        refName
      }));
    case "h2":
      return /* @__PURE__ */ React.createElement("h2", {
        className: "font-title text-2xl"
      }, /* @__PURE__ */ React.createElement(StudyInput, {
        initialValue: value,
        placeholder: "Heading 2",
        name: "h2",
        refName
      }));
    case "h3":
      return /* @__PURE__ */ React.createElement("h3", {
        className: "font-title text-xl"
      }, /* @__PURE__ */ React.createElement(StudyInput, {
        initialValue: value,
        placeholder: "Heading 3",
        name: "h3",
        refName
      }));
    case "img":
      return /* @__PURE__ */ React.createElement(InputImage, {
        name: id
      });
    case "p":
      return /* @__PURE__ */ React.createElement("p", {
        style: { margin: 0 }
      }, /* @__PURE__ */ React.createElement(TextBlock, {
        initialValue: value,
        refName,
        name: "p",
        setFocusOnPreviousContent,
        addContent
      }));
    case "div":
      return /* @__PURE__ */ React.createElement(TextBlock, {
        refName,
        name: "div",
        setFocusOnPreviousContent,
        addContent
      });
    case "code":
      return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(CodeBlock, {
        initialValue: value,
        refName,
        name: "code",
        setFocusOnPreviousContent,
        addContent
      }));
    default:
      throw new Error(`Unkown tag name: ${tag}`);
  }
}
function ContentBlock({
  tag,
  value,
  refName,
  onRemove,
  addSpace,
  addContent,
  setFocusOnPreviousContent,
  setFocusOnNextContent,
  id
}) {
  return /* @__PURE__ */ React.createElement("div", {
    onKeyDown: (evt) => {
      const target = evt.target;
      if (evt.code === "Backspace" && target.value.length === 0) {
        onRemove();
      }
      if (evt.code === "Enter") {
        if (evt.target.selectionStart !== evt.target.value.length) {
          return;
        }
        if (tag === "code") {
          return;
        }
        evt == null ? void 0 : evt.preventDefault();
        return addSpace();
      }
    },
    tabIndex: 0,
    className: "relative mb-3"
  }, formatContent(tag, value, refName, setFocusOnPreviousContent, setFocusOnNextContent, addContent, id));
}

// app/modules/editor/reducer.ts
init_react();
var import_nanoid = require("nanoid");
var initialState = {
  onText: false,
  content: [],
  previous: false,
  focusIndex: 0,
  title: ""
};
var reducer = (state, action6) => {
  const { content } = state;
  switch (action6.type) {
    case "SET_CONTENT" /* SetContent */: {
      const { title, content: content2 } = action6.payload;
      return __spreadProps(__spreadValues({}, state), { title, content: content2 });
    }
    case "FOCUS_DOCUMENT" /* Focus */: {
      return __spreadProps(__spreadValues({}, state), { onText: true });
    }
    case "BLUR_DOCUMENT" /* Blur */: {
      return __spreadProps(__spreadValues({}, state), { onText: false });
    }
    case "ADD_SPACE" /* AddSpace */: {
      const { idx } = action6.payload;
      return __spreadProps(__spreadValues({}, state), {
        content: [...content, { tag: "div", value: "" }],
        previous: false,
        focusIndex: idx + 1
      });
    }
    case "ADD_CONTENT" /* AddContent */: {
      const { tag, value, idx = content.length - 1 } = action6.payload;
      return __spreadProps(__spreadValues({}, state), {
        onText: tag === "p" ? true : false,
        previous: tag === "h1",
        content: [...content, { tag, value, id: (0, import_nanoid.nanoid)() }],
        focusIndex: idx === -1 ? idx + 2 : idx + 1
      });
    }
    case "REMOVE_CONTENT" /* RemoveContent */: {
      const { idx } = action6.payload;
      const newContent = content;
      newContent.splice(idx, 1);
      return __spreadProps(__spreadValues({}, state), {
        focusIndex: idx - 1,
        content: [...newContent]
      });
    }
    case "SET_TITLE" /* SetTitle */: {
      const { value } = action6.payload;
      return __spreadProps(__spreadValues({}, state), { title: value });
    }
    default: {
      throw new Error(`We don't know this action type: ${action6.type}`);
    }
  }
};

// app/modules/editor/components/textarea-block/textarea-block.tsx
init_react();
var import_react16 = require("react");
var import_react_textarea_autosize3 = __toESM(require("react-textarea-autosize"));
function TextareaBlock({
  addContent,
  addSpace,
  setFocusOnLastContent,
  addBlur
}) {
  const [value, setValue] = (0, import_react16.useState)("");
  const ref = (0, import_react16.useRef)(null);
  (0, import_react16.useEffect)(() => {
    var _a;
    (_a = ref.current) == null ? void 0 : _a.focus();
  }, []);
  (0, import_react16.useEffect)(() => {
    if (value.startsWith("# ")) {
      setValue("");
      addContent({ tag: "h1", value: "" });
    }
    if (value.startsWith("## ")) {
      setValue("");
      addContent({ tag: "h2", value: "" });
    }
    if (value.startsWith("### ")) {
      setValue("");
      addContent({ tag: "h3", value: "" });
    }
    if (value.startsWith("/img ")) {
      setValue("");
      addContent({ tag: "img", value: "" });
    }
    if (value.startsWith("/code ")) {
      setValue("");
      addContent({ tag: "code", value: "" });
    }
  }, [value, addContent]);
  return /* @__PURE__ */ React.createElement(import_react_textarea_autosize3.default, {
    style: { paddingLeft: 20, marginLeft: -20 },
    ref,
    value,
    onChange: (evt) => {
      setValue(evt.target.value);
    },
    onKeyDown: (evt) => {
      const target = evt.target;
      if (evt.code === "Backspace" && target.value.length === 0) {
        evt.preventDefault();
        setFocusOnLastContent();
      }
      if (evt.code === "Enter") {
        evt.preventDefault();
        if (value.length === 1) {
          addSpace();
        } else {
          addContent({ tag: "p", value: evt.target.value, idx: null });
        }
        setValue("");
      }
    },
    className: "w-full resize-none text-xl focus:outline-none",
    onFocus: (e) => e.target.placeholder = `Type '/' for commands`,
    onBlur: (e) => {
      addBlur();
      return e.target.placeholder = "";
    }
  });
}

// app/modules/editor/index.tsx
var Editor = ({ data }) => {
  const [{ onText, content, focusIndex, title }, dispatch] = (0, import_react17.useReducer)(reducer, __spreadValues({}, initialState));
  const itemsRef = (0, import_react17.useRef)([]);
  (0, import_react17.useEffect)(() => {
    if (data) {
      dispatch({
        type: "SET_CONTENT" /* SetContent */,
        payload: { title: data == null ? void 0 : data.title, content: data == null ? void 0 : data.content }
      });
    }
  }, [data]);
  (0, import_react17.useEffect)(() => {
    itemsRef.current = itemsRef.current.slice(0, content == null ? void 0 : content.length);
  }, [content]);
  (0, import_react17.useEffect)(() => {
    console.log("Setting focus on: ", focusIndex);
    setFocusOn(focusIndex);
  }, [focusIndex]);
  function setFocusOn(idx) {
    var _a, _b;
    if (!itemsRef.current[idx]) {
      return (_a = itemsRef.current[idx - 1]) == null ? void 0 : _a.focus();
    }
    return (_b = itemsRef.current[idx]) == null ? void 0 : _b.focus();
  }
  function setFocusOnLastContent() {
    var _a;
    (_a = itemsRef.current[(content == null ? void 0 : content.length) - 1]) == null ? void 0 : _a.focus();
  }
  function setFocusOnNextContent(idx) {
    var _a;
    (_a = itemsRef.current[idx + 1]) == null ? void 0 : _a.focus();
  }
  function setFocusOnPreviousContent(idx) {
    var _a;
    if (itemsRef.current[idx - 1]) {
      (_a = itemsRef.current[idx - 1]) == null ? void 0 : _a.focus();
    }
  }
  return /* @__PURE__ */ React.createElement("section", {
    className: "mx-auto mt-5 w-full max-w-3xl px-5"
  }, content == null ? void 0 : content.map(({ tag, value, id }, idx) => {
    return /* @__PURE__ */ React.createElement(ContentBlock, {
      tag,
      value,
      key: id,
      id,
      onRemove: () => {
        dispatch({
          type: "REMOVE_CONTENT" /* RemoveContent */,
          payload: { idx }
        });
      },
      addSpace: () => {
        dispatch({ type: "ADD_SPACE" /* AddSpace */, payload: { idx } });
      },
      addContent: (payload) => dispatch({ type: "ADD_CONTENT" /* AddContent */, payload }),
      refName: (el) => itemsRef.current[idx] = el,
      setFocusOnNextContent: () => setFocusOnNextContent(idx),
      setFocusOnPreviousContent: () => setFocusOnPreviousContent(idx)
    });
  }), onText ? /* @__PURE__ */ React.createElement(TextareaBlock, {
    addContent: (payload) => dispatch({ type: "ADD_CONTENT" /* AddContent */, payload }),
    addSpace: () => dispatch({
      type: "ADD_SPACE" /* AddSpace */,
      payload: { idx: focusIndex }
    }),
    addBlur: () => {
      dispatch({ type: "BLUR_DOCUMENT" /* Blur */ });
    },
    setFocusOnLastContent,
    height: "calc(100vh - 95px"
  }) : /* @__PURE__ */ React.createElement("div", {
    style: { height: "80vh", cursor: "text" },
    onClick: () => {
      dispatch({ type: "FOCUS_DOCUMENT" /* Focus */ });
    }
  }));
};

// route:/Users/newll/Desktop/portfolio/app/routes/new.tsx
var action5 = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const fields = Object.entries(formData._fields);
  const body = [];
  if (typeof title !== "string" || title.length === 0) {
    return (0, import_node7.json)({ errors: { title: "Title is required" } }, { status: 400 });
  }
  fields.forEach((field) => {
    if (field[0] === "title") {
      return;
    }
    if (field[1][0].type) {
      return;
    }
    if (field[1].length > 1) {
      field[1].forEach((item) => body.push({ tag: field[0], value: item, id: (0, import_nanoid2.nanoid)() }));
    } else {
      body.push({ tag: field[0], value: field[1][0], id: (0, import_nanoid2.nanoid)() });
    }
  });
  const post = await createPost({
    title,
    content: body,
    tags: ["Java Script"]
  });
  return (0, import_node7.redirect)(`/blog/${post.id}`);
};
function NewPostPage() {
  const actionData = (0, import_react18.useActionData)();
  return /* @__PURE__ */ React.createElement(import_react18.Form, {
    method: "post",
    encType: "multipart/form-data"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mx-auto flex h-16 w-full max-w-5xl items-center justify-between p-6"
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_react18.Link, {
    to: "/"
  }, /* @__PURE__ */ React.createElement("img", {
    src: logo_default,
    alt: "Logotype",
    width: "40",
    height: "40"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-between"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "submit"
  }, "Publish"))), /* @__PURE__ */ React.createElement("input", {
    type: "text",
    name: "title",
    placeholder: "Title",
    className: "mx-auto mt-5 mb-1 block w-full max-w-3xl px-5 text-3xl font-semibold capitalize text-black	",
    required: true
  }), /* @__PURE__ */ React.createElement(Editor, {
    data: { title: "", content: [] }
  }));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
init_react();
var assets_manifest_default = { "version": "f6480f1b", "entry": { "module": "/build/entry.client-N66XTCW7.js", "imports": ["/build/_shared/chunk-54VPSM24.js", "/build/_shared/chunk-6BO74FWO.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-7NELEWO3.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/blog/$post": { "id": "routes/blog/$post", "parentId": "root", "path": "blog/:post", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/blog/$post-TILFV5P7.js", "imports": ["/build/_shared/chunk-OE7Q2AJ5.js", "/build/_shared/chunk-QGFFSOY2.js", "/build/_shared/chunk-SJZMNPWQ.js", "/build/_shared/chunk-WHIL2QAG.js", "/build/_shared/chunk-DGRRHX5Q.js", "/build/_shared/chunk-I3AYPOVQ.js", "/build/_shared/chunk-ON2L6CNU.js", "/build/_shared/chunk-IG7VUIGS.js", "/build/_shared/chunk-DVTVJSQP.js", "/build/_shared/chunk-ITXEWKUE.js", "/build/_shared/chunk-TLQAROPN.js", "/build/_shared/chunk-MY3DZ4ZH.js", "/build/_shared/chunk-FHA7RXBD.js", "/build/_shared/chunk-5OL46L5U.js", "/build/_shared/chunk-CZ4NS77G.js", "/build/_shared/chunk-5BTQIAZ6.js", "/build/_shared/chunk-IQJKUSZI.js", "/build/_shared/chunk-ZSF5QCFL.js", "/build/_shared/chunk-BYVBO4ZM.js", "/build/_shared/chunk-VUCRGBT4.js", "/build/_shared/chunk-RFDHMZ2V.js", "/build/_shared/chunk-MRRRJWIZ.js", "/build/_shared/chunk-F6PTPIN4.js", "/build/_shared/chunk-YKIWF62A.js", "/build/_shared/chunk-6VBJ76GS.js", "/build/_shared/chunk-5AJATTJ6.js", "/build/_shared/chunk-XXEZE42X.js", "/build/_shared/chunk-IK7NWATT.js", "/build/_shared/chunk-DLWOIBZM.js", "/build/_shared/chunk-WFL46ACQ.js", "/build/_shared/chunk-HJCPQUW2.js", "/build/_shared/chunk-RABK6PST.js", "/build/_shared/chunk-J2GLMTZF.js", "/build/_shared/chunk-ZBEMKIOA.js", "/build/_shared/chunk-BKYE2NFK.js", "/build/_shared/chunk-NQBYTCUL.js", "/build/_shared/chunk-QEWW3426.js", "/build/_shared/chunk-6NB7YSP2.js", "/build/_shared/chunk-CWNCNXLZ.js", "/build/_shared/chunk-7WEEEZ7Q.js", "/build/_shared/chunk-SFGK6CNW.js", "/build/_shared/chunk-NODEI4G7.js", "/build/_shared/chunk-4SHMTQGY.js", "/build/_shared/chunk-WESKXLJN.js", "/build/_shared/chunk-XFOGG3HX.js", "/build/_shared/chunk-4SH3BPCH.js", "/build/_shared/chunk-6PQN4BFE.js", "/build/_shared/chunk-5EVAG5XA.js", "/build/_shared/chunk-7SZC2NMP.js", "/build/_shared/chunk-6SHAPRVI.js", "/build/_shared/chunk-QPNZHKNQ.js", "/build/_shared/chunk-TDGHHWF5.js", "/build/_shared/chunk-W7UCHJJV.js", "/build/_shared/chunk-XW6EIFEC.js", "/build/_shared/chunk-WKLOPJO4.js", "/build/_shared/chunk-E2RTXJCV.js", "/build/_shared/chunk-GBFVYFAC.js", "/build/_shared/chunk-YTEL6EKF.js", "/build/_shared/chunk-ARS7KJ3H.js", "/build/_shared/chunk-HBJ6EXLS.js", "/build/_shared/chunk-PFCX45M2.js", "/build/_shared/chunk-G7QJ73HC.js", "/build/_shared/chunk-P4STQK2H.js", "/build/_shared/chunk-AE5ONS7F.js", "/build/_shared/chunk-TNDOD46L.js", "/build/_shared/chunk-RMKAVAJJ.js", "/build/_shared/chunk-5ACKXAKA.js", "/build/_shared/chunk-HDDR676I.js", "/build/_shared/chunk-YESLSXGZ.js", "/build/_shared/chunk-344OZDEU.js", "/build/_shared/chunk-5M3VYIGH.js", "/build/_shared/chunk-AY4EC6J7.js", "/build/_shared/chunk-DCUA2FKY.js", "/build/_shared/chunk-4LLAB4GK.js", "/build/_shared/chunk-BEQTWTKB.js", "/build/_shared/chunk-QSVAGMKX.js", "/build/_shared/chunk-BKXEPCEZ.js", "/build/_shared/chunk-3JLMDS35.js", "/build/_shared/chunk-QC5VWZG4.js", "/build/_shared/chunk-3TLYTUBX.js", "/build/_shared/chunk-IAYDITTN.js", "/build/_shared/chunk-6ICXIZJM.js", "/build/_shared/chunk-ZV22NVIU.js", "/build/_shared/chunk-NWLJ3E5T.js", "/build/_shared/chunk-7DRFJSNH.js", "/build/_shared/chunk-PREGQHIN.js", "/build/_shared/chunk-G3CK6KSS.js", "/build/_shared/chunk-K5PRPOXL.js", "/build/_shared/chunk-E2DIQ7GM.js", "/build/_shared/chunk-XKD3WFKB.js", "/build/_shared/chunk-24GEXKLP.js", "/build/_shared/chunk-UDUSOFOA.js", "/build/_shared/chunk-J5I3LYRK.js", "/build/_shared/chunk-T7Y7T25A.js", "/build/_shared/chunk-DPYCNCIA.js", "/build/_shared/chunk-EECDDG6M.js", "/build/_shared/chunk-R6SLUBIR.js", "/build/_shared/chunk-Z67LXL5Z.js", "/build/_shared/chunk-F3KEUMZQ.js", "/build/_shared/chunk-SOX7S7G6.js", "/build/_shared/chunk-NU5HG4YH.js", "/build/_shared/chunk-N3OSFEFI.js", "/build/_shared/chunk-QXDKYQLB.js", "/build/_shared/chunk-IQCU4I3C.js", "/build/_shared/chunk-PJKDEY5F.js", "/build/_shared/chunk-K3XSVMS4.js", "/build/_shared/chunk-2QKQ23QO.js", "/build/_shared/chunk-42VSXOXM.js", "/build/_shared/chunk-SBNHD6EG.js", "/build/_shared/chunk-32SYQPRW.js", "/build/_shared/chunk-55LYSKGK.js", "/build/_shared/chunk-NHAK6BNT.js", "/build/_shared/chunk-AVGKVZMC.js", "/build/_shared/chunk-TRKGJVTY.js", "/build/_shared/chunk-TNGHHGW3.js", "/build/_shared/chunk-XVZ5O5NC.js", "/build/_shared/chunk-NPRVRW4I.js", "/build/_shared/chunk-QCCY3HJB.js", "/build/_shared/chunk-HV2KF5M3.js", "/build/_shared/chunk-42SRKSC2.js", "/build/_shared/chunk-EK2CUWPF.js", "/build/_shared/chunk-EQGGEJXL.js", "/build/_shared/chunk-I6NG7HZ7.js", "/build/_shared/chunk-UJYA5FHF.js", "/build/_shared/chunk-PJXEEZWA.js", "/build/_shared/chunk-T3HUXQ3N.js", "/build/_shared/chunk-XDUJ4JIS.js", "/build/_shared/chunk-EKLUMP7X.js", "/build/_shared/chunk-M4T4GRMX.js", "/build/_shared/chunk-TSGYCBIY.js", "/build/_shared/chunk-6XAZ2BZY.js", "/build/_shared/chunk-WRLTLMFB.js", "/build/_shared/chunk-6HGSSIHI.js", "/build/_shared/chunk-PQUVVZGL.js", "/build/_shared/chunk-YNOL3ZHH.js", "/build/_shared/chunk-QNXQLAAU.js", "/build/_shared/chunk-EKGIBVDQ.js", "/build/_shared/chunk-LU6I4TS3.js", "/build/_shared/chunk-IM63ANHQ.js", "/build/_shared/chunk-MWDF573D.js", "/build/_shared/chunk-PEH7D5C4.js", "/build/_shared/chunk-VIVGV5BP.js", "/build/_shared/chunk-FSBOY6EE.js", "/build/_shared/chunk-X3UQVDVY.js", "/build/_shared/chunk-FUHZU7AV.js", "/build/_shared/chunk-3TU3U7LW.js", "/build/_shared/chunk-MGDLIYQC.js", "/build/_shared/chunk-N6C5XRBG.js", "/build/_shared/chunk-TT7WTETR.js", "/build/_shared/chunk-SNTELWNG.js", "/build/_shared/chunk-4F2PEKPJ.js", "/build/_shared/chunk-HCM5PTUN.js", "/build/_shared/chunk-5FFNIDR5.js", "/build/_shared/chunk-LX5J42JT.js", "/build/_shared/chunk-TTWG6NKC.js", "/build/_shared/chunk-5PEWUOWB.js", "/build/_shared/chunk-6KUO7MWM.js", "/build/_shared/chunk-6NWBNSGR.js", "/build/_shared/chunk-T7RE6QXQ.js", "/build/_shared/chunk-E7JH6OP7.js", "/build/_shared/chunk-3Q7B52F4.js", "/build/_shared/chunk-Z6QFPLXI.js", "/build/_shared/chunk-QYZEUAVD.js", "/build/_shared/chunk-C62CHMDX.js", "/build/_shared/chunk-ND27OJIH.js", "/build/_shared/chunk-LWWQH5DL.js", "/build/_shared/chunk-PLLZRMW3.js", "/build/_shared/chunk-YSFCHYS2.js", "/build/_shared/chunk-AD7XF473.js", "/build/_shared/chunk-VFJSDQXS.js", "/build/_shared/chunk-MBPCCGH5.js", "/build/_shared/chunk-6XTLCITA.js", "/build/_shared/chunk-2OLN5ZLA.js", "/build/_shared/chunk-5AXKMJV2.js", "/build/_shared/chunk-O55H7TWK.js", "/build/_shared/chunk-TTXBUUD4.js", "/build/_shared/chunk-JUTUAY5X.js", "/build/_shared/chunk-5FDCCDOM.js", "/build/_shared/chunk-7Y7SWNNK.js", "/build/_shared/chunk-Y3CP2IAR.js", "/build/_shared/chunk-A6JN4MP4.js", "/build/_shared/chunk-DYSJPC7G.js", "/build/_shared/chunk-663DD7ID.js", "/build/_shared/chunk-JNUOQOBB.js", "/build/_shared/chunk-K6JYSHSM.js", "/build/_shared/chunk-2IFRDJA4.js", "/build/_shared/chunk-2QRK2DMG.js", "/build/_shared/chunk-7TZG7MPX.js", "/build/_shared/chunk-QI5FKCXW.js", "/build/_shared/chunk-TSJXSCPL.js", "/build/_shared/chunk-GJIZE57S.js", "/build/_shared/chunk-TRUTXVWJ.js", "/build/_shared/chunk-QQGQ7VR6.js", "/build/_shared/chunk-FZMWRBHN.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/blog/index": { "id": "routes/blog/index", "parentId": "root", "path": "blog", "index": true, "caseSensitive": void 0, "module": "/build/routes/blog/index-QU44Z62G.js", "imports": ["/build/_shared/chunk-R33XXVO3.js", "/build/_shared/chunk-4HLHUB5Y.js", "/build/_shared/chunk-FZMWRBHN.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/healthcheck": { "id": "routes/healthcheck", "parentId": "root", "path": "healthcheck", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/healthcheck-OWD5RCQB.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-2Y7QUKOR.js", "imports": ["/build/_shared/chunk-R33XXVO3.js", "/build/_shared/chunk-4HLHUB5Y.js", "/build/_shared/chunk-FZMWRBHN.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/join": { "id": "routes/join", "parentId": "root", "path": "join", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/join-UKXERSKM.js", "imports": ["/build/_shared/chunk-HWYW5B2Y.js", "/build/_shared/chunk-4HLHUB5Y.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/login-QLUYJO2D.js", "imports": ["/build/_shared/chunk-HWYW5B2Y.js", "/build/_shared/chunk-4HLHUB5Y.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/logout-OP4LACLI.js", "imports": void 0, "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/new": { "id": "routes/new", "parentId": "root", "path": "new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/new-6IGNR2PM.js", "imports": ["/build/_shared/chunk-OE7Q2AJ5.js", "/build/_shared/chunk-QGFFSOY2.js", "/build/_shared/chunk-SJZMNPWQ.js", "/build/_shared/chunk-WHIL2QAG.js", "/build/_shared/chunk-DGRRHX5Q.js", "/build/_shared/chunk-I3AYPOVQ.js", "/build/_shared/chunk-ON2L6CNU.js", "/build/_shared/chunk-IG7VUIGS.js", "/build/_shared/chunk-DVTVJSQP.js", "/build/_shared/chunk-ITXEWKUE.js", "/build/_shared/chunk-TLQAROPN.js", "/build/_shared/chunk-MY3DZ4ZH.js", "/build/_shared/chunk-FHA7RXBD.js", "/build/_shared/chunk-5OL46L5U.js", "/build/_shared/chunk-CZ4NS77G.js", "/build/_shared/chunk-5BTQIAZ6.js", "/build/_shared/chunk-IQJKUSZI.js", "/build/_shared/chunk-ZSF5QCFL.js", "/build/_shared/chunk-BYVBO4ZM.js", "/build/_shared/chunk-VUCRGBT4.js", "/build/_shared/chunk-RFDHMZ2V.js", "/build/_shared/chunk-MRRRJWIZ.js", "/build/_shared/chunk-F6PTPIN4.js", "/build/_shared/chunk-YKIWF62A.js", "/build/_shared/chunk-6VBJ76GS.js", "/build/_shared/chunk-5AJATTJ6.js", "/build/_shared/chunk-XXEZE42X.js", "/build/_shared/chunk-IK7NWATT.js", "/build/_shared/chunk-DLWOIBZM.js", "/build/_shared/chunk-WFL46ACQ.js", "/build/_shared/chunk-HJCPQUW2.js", "/build/_shared/chunk-RABK6PST.js", "/build/_shared/chunk-J2GLMTZF.js", "/build/_shared/chunk-ZBEMKIOA.js", "/build/_shared/chunk-BKYE2NFK.js", "/build/_shared/chunk-NQBYTCUL.js", "/build/_shared/chunk-QEWW3426.js", "/build/_shared/chunk-6NB7YSP2.js", "/build/_shared/chunk-CWNCNXLZ.js", "/build/_shared/chunk-7WEEEZ7Q.js", "/build/_shared/chunk-SFGK6CNW.js", "/build/_shared/chunk-NODEI4G7.js", "/build/_shared/chunk-4SHMTQGY.js", "/build/_shared/chunk-WESKXLJN.js", "/build/_shared/chunk-XFOGG3HX.js", "/build/_shared/chunk-4SH3BPCH.js", "/build/_shared/chunk-6PQN4BFE.js", "/build/_shared/chunk-5EVAG5XA.js", "/build/_shared/chunk-7SZC2NMP.js", "/build/_shared/chunk-6SHAPRVI.js", "/build/_shared/chunk-QPNZHKNQ.js", "/build/_shared/chunk-TDGHHWF5.js", "/build/_shared/chunk-W7UCHJJV.js", "/build/_shared/chunk-XW6EIFEC.js", "/build/_shared/chunk-WKLOPJO4.js", "/build/_shared/chunk-E2RTXJCV.js", "/build/_shared/chunk-GBFVYFAC.js", "/build/_shared/chunk-YTEL6EKF.js", "/build/_shared/chunk-ARS7KJ3H.js", "/build/_shared/chunk-HBJ6EXLS.js", "/build/_shared/chunk-PFCX45M2.js", "/build/_shared/chunk-G7QJ73HC.js", "/build/_shared/chunk-P4STQK2H.js", "/build/_shared/chunk-AE5ONS7F.js", "/build/_shared/chunk-TNDOD46L.js", "/build/_shared/chunk-RMKAVAJJ.js", "/build/_shared/chunk-5ACKXAKA.js", "/build/_shared/chunk-HDDR676I.js", "/build/_shared/chunk-YESLSXGZ.js", "/build/_shared/chunk-344OZDEU.js", "/build/_shared/chunk-5M3VYIGH.js", "/build/_shared/chunk-AY4EC6J7.js", "/build/_shared/chunk-DCUA2FKY.js", "/build/_shared/chunk-4LLAB4GK.js", "/build/_shared/chunk-BEQTWTKB.js", "/build/_shared/chunk-QSVAGMKX.js", "/build/_shared/chunk-BKXEPCEZ.js", "/build/_shared/chunk-3JLMDS35.js", "/build/_shared/chunk-QC5VWZG4.js", "/build/_shared/chunk-3TLYTUBX.js", "/build/_shared/chunk-IAYDITTN.js", "/build/_shared/chunk-6ICXIZJM.js", "/build/_shared/chunk-ZV22NVIU.js", "/build/_shared/chunk-NWLJ3E5T.js", "/build/_shared/chunk-7DRFJSNH.js", "/build/_shared/chunk-PREGQHIN.js", "/build/_shared/chunk-G3CK6KSS.js", "/build/_shared/chunk-K5PRPOXL.js", "/build/_shared/chunk-E2DIQ7GM.js", "/build/_shared/chunk-XKD3WFKB.js", "/build/_shared/chunk-24GEXKLP.js", "/build/_shared/chunk-UDUSOFOA.js", "/build/_shared/chunk-J5I3LYRK.js", "/build/_shared/chunk-T7Y7T25A.js", "/build/_shared/chunk-DPYCNCIA.js", "/build/_shared/chunk-EECDDG6M.js", "/build/_shared/chunk-R6SLUBIR.js", "/build/_shared/chunk-Z67LXL5Z.js", "/build/_shared/chunk-F3KEUMZQ.js", "/build/_shared/chunk-SOX7S7G6.js", "/build/_shared/chunk-NU5HG4YH.js", "/build/_shared/chunk-N3OSFEFI.js", "/build/_shared/chunk-QXDKYQLB.js", "/build/_shared/chunk-IQCU4I3C.js", "/build/_shared/chunk-PJKDEY5F.js", "/build/_shared/chunk-K3XSVMS4.js", "/build/_shared/chunk-2QKQ23QO.js", "/build/_shared/chunk-42VSXOXM.js", "/build/_shared/chunk-SBNHD6EG.js", "/build/_shared/chunk-32SYQPRW.js", "/build/_shared/chunk-55LYSKGK.js", "/build/_shared/chunk-NHAK6BNT.js", "/build/_shared/chunk-AVGKVZMC.js", "/build/_shared/chunk-TRKGJVTY.js", "/build/_shared/chunk-TNGHHGW3.js", "/build/_shared/chunk-XVZ5O5NC.js", "/build/_shared/chunk-NPRVRW4I.js", "/build/_shared/chunk-QCCY3HJB.js", "/build/_shared/chunk-HV2KF5M3.js", "/build/_shared/chunk-42SRKSC2.js", "/build/_shared/chunk-EK2CUWPF.js", "/build/_shared/chunk-EQGGEJXL.js", "/build/_shared/chunk-I6NG7HZ7.js", "/build/_shared/chunk-UJYA5FHF.js", "/build/_shared/chunk-PJXEEZWA.js", "/build/_shared/chunk-T3HUXQ3N.js", "/build/_shared/chunk-XDUJ4JIS.js", "/build/_shared/chunk-EKLUMP7X.js", "/build/_shared/chunk-M4T4GRMX.js", "/build/_shared/chunk-TSGYCBIY.js", "/build/_shared/chunk-6XAZ2BZY.js", "/build/_shared/chunk-WRLTLMFB.js", "/build/_shared/chunk-6HGSSIHI.js", "/build/_shared/chunk-PQUVVZGL.js", "/build/_shared/chunk-YNOL3ZHH.js", "/build/_shared/chunk-QNXQLAAU.js", "/build/_shared/chunk-EKGIBVDQ.js", "/build/_shared/chunk-LU6I4TS3.js", "/build/_shared/chunk-IM63ANHQ.js", "/build/_shared/chunk-MWDF573D.js", "/build/_shared/chunk-PEH7D5C4.js", "/build/_shared/chunk-VIVGV5BP.js", "/build/_shared/chunk-FSBOY6EE.js", "/build/_shared/chunk-X3UQVDVY.js", "/build/_shared/chunk-FUHZU7AV.js", "/build/_shared/chunk-3TU3U7LW.js", "/build/_shared/chunk-MGDLIYQC.js", "/build/_shared/chunk-N6C5XRBG.js", "/build/_shared/chunk-TT7WTETR.js", "/build/_shared/chunk-SNTELWNG.js", "/build/_shared/chunk-4F2PEKPJ.js", "/build/_shared/chunk-HCM5PTUN.js", "/build/_shared/chunk-5FFNIDR5.js", "/build/_shared/chunk-LX5J42JT.js", "/build/_shared/chunk-TTWG6NKC.js", "/build/_shared/chunk-5PEWUOWB.js", "/build/_shared/chunk-6KUO7MWM.js", "/build/_shared/chunk-6NWBNSGR.js", "/build/_shared/chunk-T7RE6QXQ.js", "/build/_shared/chunk-E7JH6OP7.js", "/build/_shared/chunk-3Q7B52F4.js", "/build/_shared/chunk-Z6QFPLXI.js", "/build/_shared/chunk-QYZEUAVD.js", "/build/_shared/chunk-C62CHMDX.js", "/build/_shared/chunk-ND27OJIH.js", "/build/_shared/chunk-LWWQH5DL.js", "/build/_shared/chunk-PLLZRMW3.js", "/build/_shared/chunk-YSFCHYS2.js", "/build/_shared/chunk-AD7XF473.js", "/build/_shared/chunk-VFJSDQXS.js", "/build/_shared/chunk-MBPCCGH5.js", "/build/_shared/chunk-6XTLCITA.js", "/build/_shared/chunk-2OLN5ZLA.js", "/build/_shared/chunk-5AXKMJV2.js", "/build/_shared/chunk-O55H7TWK.js", "/build/_shared/chunk-TTXBUUD4.js", "/build/_shared/chunk-JUTUAY5X.js", "/build/_shared/chunk-5FDCCDOM.js", "/build/_shared/chunk-7Y7SWNNK.js", "/build/_shared/chunk-Y3CP2IAR.js", "/build/_shared/chunk-A6JN4MP4.js", "/build/_shared/chunk-DYSJPC7G.js", "/build/_shared/chunk-663DD7ID.js", "/build/_shared/chunk-JNUOQOBB.js", "/build/_shared/chunk-K6JYSHSM.js", "/build/_shared/chunk-2IFRDJA4.js", "/build/_shared/chunk-2QRK2DMG.js", "/build/_shared/chunk-7TZG7MPX.js", "/build/_shared/chunk-QI5FKCXW.js", "/build/_shared/chunk-TSJXSCPL.js", "/build/_shared/chunk-GJIZE57S.js", "/build/_shared/chunk-TRUTXVWJ.js", "/build/_shared/chunk-QQGQ7VR6.js", "/build/_shared/chunk-FZMWRBHN.js"], "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/upload": { "id": "routes/upload", "parentId": "root", "path": "upload", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/upload-AQEYLPI6.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-F6480F1B.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/healthcheck": {
    id: "routes/healthcheck",
    parentId: "root",
    path: "healthcheck",
    index: void 0,
    caseSensitive: void 0,
    module: healthcheck_exports
  },
  "routes/blog/$post": {
    id: "routes/blog/$post",
    parentId: "root",
    path: "blog/:post",
    index: void 0,
    caseSensitive: void 0,
    module: post_exports
  },
  "routes/blog/index": {
    id: "routes/blog/index",
    parentId: "root",
    path: "blog",
    index: true,
    caseSensitive: void 0,
    module: blog_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/upload": {
    id: "routes/upload",
    parentId: "root",
    path: "upload",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/join": {
    id: "routes/join",
    parentId: "root",
    path: "join",
    index: void 0,
    caseSensitive: void 0,
    module: join_exports
  },
  "routes/new": {
    id: "routes/new",
    parentId: "root",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=index.js.map
