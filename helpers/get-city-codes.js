const cityCodes = {
  "Metro Manila": "MNL",
  Cebu: "CEB",
  Davao: "DVO",
  Iloilo: "ILO",
  Bacolod: "BAC",
  Baguio: "BAG",
  "Cagayan de Oro": "CDO",
  Pampanga: "PPG",
  Balanga: "BLA",
  Tacloban: "TAC",
  "Naga City": "WNP",
  Tarlac: "TAR",
  "Metro Zamboanga": "ZAM",
  "Cabanatuan City": "CAB",
  Binalonan: "PBA",
  Subic: "SFS",
  "General Santos": "GES",
  Aklan: "MPH",
  Bohol: "TAG",
  Legazpi: "LGP",
  Dagupan: "DAG",
  Sorsogon: "SOR",
  Dumaguete: "DGT",
  Olongapo: "OLO",
  Boracay: "BOR",
  Taytay: "RZP",
  "San Jose Del Monte": "SJM",
  Lipa: "LPA",
};

// Helper function to get city code
function getCityCode(city) {
  return cityCodes[city] || "City not found";
}

module.exports = getCityCode;
