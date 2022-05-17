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

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
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
var import_node2 = require("@remix-run/node");
var import_react2 = require("@remix-run/react");

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-LVQMZOVM.css";

// app/session.server.ts
var import_node = require("@remix-run/node");
var import_tiny_invariant = __toESM(require("tiny-invariant"));

// app/models/user.server.ts
var import_bcryptjs = __toESM(require("bcryptjs"));

// app/db.server.ts
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
      href: "https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;600&family=Montserrat:wght@600&display=swap"
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
var import_node3 = require("@remix-run/node");
var import_react3 = require("@remix-run/react");
var import_tiny_invariant2 = __toESM(require("tiny-invariant"));

// app/models/post.server.ts
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

// route:/Users/newll/Desktop/portfolio/app/routes/blog/$post.tsx
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
  return /* @__PURE__ */ React.createElement("section", {
    className: "mx-20 p-20"
  }, /* @__PURE__ */ React.createElement("article", {
    className: "mx-20"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "text-3xl font-bold"
  }, post.title), /* @__PURE__ */ React.createElement("p", {
    className: "py-6"
  }, post.content)));
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

// app/components/menu.tsx
var import_react4 = require("@remix-run/react");

// public/logo.svg
var logo_default = "/build/_assets/logo-XDBE6HHO.svg";

// app/components/menu.tsx
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
var import_react8 = require("react");

// app/components/post.tsx
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
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", {
    className: "color-black font-title text-3xl"
  }, title), /* @__PURE__ */ React.createElement("p", null, description)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("time", {
    className: "text-lg	"
  }, createdAt), /* @__PURE__ */ React.createElement("p", null, tags)));
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
    if (activeFilter === "all" || tags.includes(activeFilter)) {
      return title.includes(search) && /* @__PURE__ */ React.createElement("div", {
        className: "w-full mb-4 py-4",
        key: id
      }, /* @__PURE__ */ React.createElement(BlogPost, {
        to: id,
        title,
        description: content,
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
var import_node4 = require("@remix-run/node");
var action2 = async ({ request }) => {
  return logout(request);
};
var loader5 = async () => {
  return (0, import_node4.redirect)("/");
};

// route:/Users/newll/Desktop/portfolio/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index2,
  loader: () => loader6
});
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
    className: "bg-whip px-14 pt-7 min-h-screen"
  }, /* @__PURE__ */ React.createElement(Menu, {
    user
  }), /* @__PURE__ */ React.createElement("section", {
    className: "mt-20 flex justify-between px-20"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-lr py-20"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "font-title text-6xl text-black",
    style: { margin: "0.67em 0" }
  }, "Hey I'm Den Davydov"), /* @__PURE__ */ React.createElement("p", {
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
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "font-title text-4xl"
  }, "Latest Posts"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-wrap justify-between"
  }, posts.map(({ id, title, content, createdAt, tags }) => /* @__PURE__ */ React.createElement("div", {
    className: "mt-12 w-full max-w-lg",
    key: id
  }, /* @__PURE__ */ React.createElement(BlogPost, {
    to: `blog/${id}`,
    title,
    description: content,
    createdAt: formatDateTime(new Date(createdAt)),
    tags
  }))))), /* @__PURE__ */ React.createElement("section", {
    className: "my-20 p-20"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "mb-10 font-title text-4xl"
  }, "Latest Projects"), PROJECTS.map((project) => /* @__PURE__ */ React.createElement("div", {
    key: project.title,
    className: "flex"
  }, /* @__PURE__ */ React.createElement("a", {
    href: project.link,
    className: "w-3/6"
  }, /* @__PURE__ */ React.createElement("img", {
    src: project.img,
    alt: project.title
  })), /* @__PURE__ */ React.createElement("div", {
    className: "pl-5"
  }, /* @__PURE__ */ React.createElement("a", {
    href: project.link,
    className: "font-title text-3xl"
  }, project.title), /* @__PURE__ */ React.createElement("p", {
    className: "font-text text-xl my-3"
  }, project.description), /* @__PURE__ */ React.createElement("p", null, "Technologies used: "), /* @__PURE__ */ React.createElement("ul", null, project.technologies.map((tech) => /* @__PURE__ */ React.createElement("li", {
    key: tech
  }, tech))))))), /* @__PURE__ */ React.createElement("section", {
    className: "my-20 p-20 flex flex-col justify-center"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "mb-10 font-title text-4xl text-center"
  }, "Get In Touch"), /* @__PURE__ */ React.createElement("p", {
    className: "text-center mb-8"
  }, "Currently I'm looking for a job as Frontend or Fullstack web developer."), /* @__PURE__ */ React.createElement("a", {
    href: "mailto:qepttt@gmail.com",
    className: "mx-auto p-5 bg-red text-white font-semibold"
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
var import_node7 = require("@remix-run/node");
var import_react17 = require("@remix-run/react");

// app/modules/editor/index.tsx
var import_react16 = require("react");

// app/modules/editor/components/input-block.tsx
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
var import_react13 = require("react");
function InputImage() {
  const [img, setImg] = (0, import_react13.useState)({ src: "", alt: "" });
  return /* @__PURE__ */ React.createElement(import_react13.Fragment, null, /* @__PURE__ */ React.createElement("input", {
    className: img.src && "hidden",
    type: "file",
    name: "image",
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
var import_react14 = require("react");
var import_react_textarea_autosize = __toESM(require("react-textarea-autosize"));
function TextBlock({
  initialValue = "",
  refName,
  name,
  setFocusOnPreviousContent,
  addContent
}) {
  const [value, setValue] = (0, import_react14.useState)(initialValue);
  (0, import_react14.useEffect)(() => {
    if (refName.target) {
      refName.target.style.height = `${refName.target.scrollHeight}px`;
    }
  }, [refName, value]);
  (0, import_react14.useEffect)(() => {
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
  return /* @__PURE__ */ React.createElement(import_react_textarea_autosize.default, {
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
function formatContent(tag, value, refName, setFocusOnPreviousContent, setFocusOnNextContent, addContent) {
  switch (tag) {
    case "h1":
      return /* @__PURE__ */ React.createElement("h1", {
        className: "font-title text-3xl"
      }, /* @__PURE__ */ React.createElement(StudyInput, {
        initialValue: value,
        placeholder: "Heading 1",
        name: tag,
        refName
      }));
    case "h2":
      return /* @__PURE__ */ React.createElement("h2", {
        className: "font-title text-2xl"
      }, /* @__PURE__ */ React.createElement(StudyInput, {
        initialValue: value,
        placeholder: "Heading 2",
        name: tag,
        refName
      }));
    case "h3":
      return /* @__PURE__ */ React.createElement("h3", {
        className: "font-title text-xl"
      }, /* @__PURE__ */ React.createElement(StudyInput, {
        initialValue: value,
        placeholder: "Heading 3",
        name: tag,
        refName
      }));
    case "img":
      return /* @__PURE__ */ React.createElement(InputImage, null);
    case "p":
      return /* @__PURE__ */ React.createElement("p", {
        style: { margin: 0 }
      }, /* @__PURE__ */ React.createElement(TextBlock, {
        initialValue: value,
        refName,
        name: tag,
        setFocusOnPreviousContent,
        addContent
      }));
    case "div":
      return /* @__PURE__ */ React.createElement(TextBlock, {
        refName,
        name: "space",
        setFocusOnPreviousContent,
        addContent
      });
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
  setFocusOnNextContent
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
        evt == null ? void 0 : evt.preventDefault();
        return addSpace();
      }
    },
    tabIndex: 0,
    className: "mb-3 relative"
  }, formatContent(tag, value, refName, setFocusOnPreviousContent, setFocusOnNextContent, addContent));
}

// app/modules/editor/reducer.ts
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
        content: [...content, { tag, value }],
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
var import_react15 = require("react");
var import_react_textarea_autosize2 = __toESM(require("react-textarea-autosize"));
function TextareaBlock({
  addContent,
  addSpace,
  setFocusOnLastContent,
  addBlur
}) {
  const [value, setValue] = (0, import_react15.useState)("");
  const ref = (0, import_react15.useRef)(null);
  (0, import_react15.useEffect)(() => {
    var _a;
    (_a = ref.current) == null ? void 0 : _a.focus();
  }, []);
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
    if (value.startsWith("/img ")) {
      setValue("");
      addContent({ tag: "img", value: "" });
    }
  }, [value, addContent]);
  return /* @__PURE__ */ React.createElement(import_react_textarea_autosize2.default, {
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
  const [{ onText, content, focusIndex, title }, dispatch] = (0, import_react16.useReducer)(reducer, __spreadValues({}, initialState));
  const itemsRef = (0, import_react16.useRef)([]);
  (0, import_react16.useEffect)(() => {
    if (data) {
      dispatch({
        type: "SET_CONTENT" /* SetContent */,
        payload: { title: data == null ? void 0 : data.title, content: data == null ? void 0 : data.content }
      });
    }
  }, [data]);
  (0, import_react16.useEffect)(() => {
    itemsRef.current = itemsRef.current.slice(0, content == null ? void 0 : content.length);
  }, [content]);
  (0, import_react16.useEffect)(() => {
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
  }, content == null ? void 0 : content.map(({ tag, value }, idx) => {
    return /* @__PURE__ */ React.createElement(ContentBlock, {
      tag,
      value,
      key: idx + value,
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
  const body = formData.getAll("p");
  if (typeof title !== "string" || title.length === 0) {
    return (0, import_node7.json)({ errors: { title: "Title is required" } }, { status: 400 });
  }
  if (body.length === 0) {
    console.log("body: ", body);
    return (0, import_node7.json)({ errors: { body: "Body is required" } }, { status: 400 });
  }
  const post = await createPost({
    title,
    content: body.join(" "),
    tags: ["Java Script"]
  });
  return (0, import_node7.redirect)(`/${post.id}`);
};
function NewPostPage() {
  const actionData = (0, import_react17.useActionData)();
  return /* @__PURE__ */ React.createElement(import_react17.Form, {
    method: "post"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mx-auto flex h-16 w-full max-w-5xl items-center justify-between p-6"
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_react17.Link, {
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
    className: "mx-auto mt-5 w-full max-w-3xl px-5 block",
    required: true
  }), /* @__PURE__ */ React.createElement(Editor, {
    data: { title: "", content: [] }
  }));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "0e48fdef", "entry": { "module": "/build/entry.client-N66XTCW7.js", "imports": ["/build/_shared/chunk-54VPSM24.js", "/build/_shared/chunk-6BO74FWO.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-TQLHJLUZ.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/blog/$post": { "id": "routes/blog/$post", "parentId": "root", "path": "blog/:post", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/blog/$post-4F3Z4R77.js", "imports": ["/build/_shared/chunk-OYAERKW6.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/blog/index": { "id": "routes/blog/index", "parentId": "root", "path": "blog", "index": true, "caseSensitive": void 0, "module": "/build/routes/blog/index-YMARW7SD.js", "imports": ["/build/_shared/chunk-TD7FH44I.js", "/build/_shared/chunk-NYOE747V.js", "/build/_shared/chunk-OYAERKW6.js", "/build/_shared/chunk-4HLHUB5Y.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/healthcheck": { "id": "routes/healthcheck", "parentId": "root", "path": "healthcheck", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/healthcheck-OWD5RCQB.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-BJVZS73I.js", "imports": ["/build/_shared/chunk-TD7FH44I.js", "/build/_shared/chunk-NYOE747V.js", "/build/_shared/chunk-OYAERKW6.js", "/build/_shared/chunk-4HLHUB5Y.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/join": { "id": "routes/join", "parentId": "root", "path": "join", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/join-UKXERSKM.js", "imports": ["/build/_shared/chunk-HWYW5B2Y.js", "/build/_shared/chunk-4HLHUB5Y.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/login-QLUYJO2D.js", "imports": ["/build/_shared/chunk-HWYW5B2Y.js", "/build/_shared/chunk-4HLHUB5Y.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/logout-OP4LACLI.js", "imports": void 0, "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/new": { "id": "routes/new", "parentId": "root", "path": "new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/new-6OANUCMP.js", "imports": ["/build/_shared/chunk-NYOE747V.js", "/build/_shared/chunk-OYAERKW6.js"], "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-0E48FDEF.js" };

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
