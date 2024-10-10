'use client'

import { salesByPeriod } from '@/actions/reports/sales-by-period'
import { formatPeriodToDate } from '@/utils/formatPeriodToDate'
import { MainReport } from './main-report'
import { useState } from 'react'

export function PeriodForm() {
  const [report, setReport] = useState({
    sales: 0,
    openSales: 0,
  })

  async function onChangePeriod(period: string) {
    const { startDate, endDate } = formatPeriodToDate(period)

    const { sales, openSales } = await salesByPeriod(startDate, endDate)

    if (sales && openSales) setReport({ sales, openSales })
  }

  return (
    <>
      <div className="rounded-xl bg-zinc-800 p-4">
        <select
          className="w-full rounded p-2 text-zinc-800"
          onChange={(e) => onChangePeriod(e.target.value)}
        >
          <option value="">Selecione o período</option>
          <option value="today">Hoje</option>
          <option value="yesterday">Ontem</option>
          <option value="this-week">Esta semana</option>
          <option value="last-week">Semana passada</option>
          <option value="this-month">Este mês</option>
          <option value="last-month">Mês passado</option>
          <option value="last-3-months">Ultimos 3 meses</option>
        </select>
      </div>
      <MainReport openSales={report.openSales} sales={report.sales} />
    </>
  )
}
