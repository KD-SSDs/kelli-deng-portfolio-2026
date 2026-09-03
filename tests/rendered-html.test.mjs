import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the integrated portfolio shell and all stable routes", async () => {
  const routes = ["/", "/home-directions", "/work", "/approach", "/about", "/resume", "/work/value-tier-portfolio", "/work/a200", "/work/genai-next-gen"];
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, route);
  }
  const home = await (await render("/")).text();
  assert.match(home, /kelli deng portfolio 2026/i);
  assert.match(home, /Strategic Designer/);
  assert.match(home, /Design belief/);
  assert.match(home, /Value-Tier Product Portfolio Strategy/);
  assert.match(home, /旗舰视觉转译/);
  assert.match(home, /\/work\/a200#a200s/);
  assert.match(home, /href="\/about"/);
  assert.doesNotMatch(home, />Resume<\/a>/);

  const about = await (await render("/about")).text();
  assert.match(about, /职业亮点 \/ Career highlights/);
  assert.match(about, /Kelli-Deng-Resume-2026\.pdf/);
});
