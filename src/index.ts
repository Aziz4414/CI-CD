import express from 'express';
//import { json } from 'node:stream/consumers';
const app = express();
const port = 8000;

import * as si from 'systeminformation';

const baseUri = '/api/v1/sysinfo';

async function getinfo() {
  const cpu = await si.cpu();
  const system = await si.system();
  const mem = await si.mem();
  const os = await si.osInfo();
  const CurrentLoad = await si.currentLoad();
  const processes = await si.processes();
  // const disk = (await si.diskLayout())[0] || '';
  const networkInterfaces = (await si.networkInterfaces())[0];

  // CPU Info
  let info = `SystemInformation {\n`;

  info += `CPU: ${JSON.stringify(cpu.cores)} (${JSON.stringify(
    cpu.physicalCores,
  )} Physical) ; \n`;

  //System Info
  info += `System: ${JSON.stringify(system.model)} ; \n`;

  // RAM Info
  const totalRam = Math.round(mem.total / 1024 / 1024 / 1024);
  info += `Mem: ${JSON.stringify(totalRam)}GB ; \n`;

  //OS Info
  info += `OS: ${JSON.stringify(os.platform)}${JSON.stringify(os.kernel)} ; \n`;

  //CurrentLoad Info
  info += `CurrentLoad: ${JSON.stringify(CurrentLoad.avgLoad)} ; \n`;

  //processes Info
  info += `Processes: ${JSON.stringify(processes.running)} ; \n`;

  // Disk Info
  // const size = Math.round(disk.size / 1024 / 1024 / 1024);
  // info += `Disk: ${JSON.stringify(disk.name)} ${size}GB ${JSON.stringify(
  //   disk.type,
  // )} ; \n`;

  //NetworkInterfaces Info
  info += `NetworkInterfaces: ${JSON.stringify(networkInterfaces.iface)} ; \n`;

  info += `}`;

  return info;
}


 interface ISystemInformation {
  cpu: si.Systeminformation.CpuData;
  system: si.Systeminformation.SystemData;
  mem: si.Systeminformation.MemData;
  os: si.Systeminformation.OsData;
  currentLoad: si.Systeminformation.CurrentLoadData;
  processes: si.Systeminformation.ProcessesData;
  diskLayout: si.Systeminformation.DiskLayoutData[];
  networkInterfaces: si.Systeminformation.NetworkInterfacesData[];
 }

app.get(baseUri, async (req, res) => {
  const info = await getinfo();
  res.send(info);
});

app.all('*', (req, res) => {
  res.status(404).send('Page not found !!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}${baseUri}`);
});
