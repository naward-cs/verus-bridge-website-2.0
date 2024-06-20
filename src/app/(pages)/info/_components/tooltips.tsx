export const DaiTooltip = () => {
  return (
    <div className="max-w-sm">
      <p>This is the last protocol price for the Bridge.vETH currency.</p>
    </div>
  )
}

export const SupplyToolTip = () => {
  return (
    <div className="max-w-sm space-y-2">
      <p>
        During the preconversion timeframe there is a fixed initial supply. This
        initial supply will be distributed by the protocol once the currency is
        launched.
      </p>

      <p>
        After the launch the supply is dynamic since people can convert to it,
        and out of it.
      </p>
    </div>
  )
}

export const ReserveDaiTip = () => {
  return (
    <div className="max-w-sm space-y-2">
      <p>The protocol price of the reserves in DAI.</p>
    </div>
  )
}

export const MarketTip = () => {
  return (
    <div>
      <p>
        The protocol price compared to CoinGecko market price (source:
        coinpaprika.com).
      </p>
    </div>
  )
}
