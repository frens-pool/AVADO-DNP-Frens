const dev = true;

export const server_config = dev ?
{
  monitor_url: "http://localhost:9999",
  gundb_url: "http://localhost:9998/gun"
}:{
  monitor_url: "https://frens.my.ava.do:9999",
  gundb_url: "http://frens.my.ava.do:9998"
};
