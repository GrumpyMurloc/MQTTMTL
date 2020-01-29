interface Det0 {
  lane: string;
  vehicleType: string;
  statistique: string;
}

interface Det1 {
  statistique: string;
  zone?: string;
  class?: string;
}

interface ParsedData {
  topic: Det0 | Det1;
  data: any;
}

interface DataSource {
  data: ParsedData[];
}
function isDet0(det: any): det is Det0 {
  return (det as Det0).lane !== undefined;
}
export { Det0, Det1, ParsedData, DataSource, isDet0}
