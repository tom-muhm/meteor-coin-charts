// btce currencies
var c = {
  BTC: "BTC",
  LTC: "LTC",
  USD: "USD",
  EUR: "EUR",
  RUR: "RUR",
  NMC: "NMC",
  NVC: "NVC",
  TRC: "TRC",
  PPC: "PPC",
  FTC: "FTC",
  CNC: "CNC"
};

// btce currency pairs
var currency_pairs = [
  [c.BTC, c.USD],
  [c.BTC, c.RUR],
  [c.BTC, c.EUR],
  [c.LTC, c.BTC],
  [c.LTC, c.USD],
  [c.LTC, c.RUR],
  [c.NMC, c.BTC],
  [c.USD, c.RUR],
  [c.EUR, c.USD],
  [c.NVC, c.BTC],
  [c.TRC, c.BTC],
  [c.PPC, c.BTC],
  [c.FTC, c.BTC],
  [c.CNC, c.BTC]
];

function getStringPairs() {
  var pairs = [];
  _.each(currency_pairs, function(pair) {
    pairs.push(pair.join('_').toLowerCase());
  });
  return pairs;
}

BTCE_PAIRS = getStringPairs();