import { FocusPopoverFrame } from './FocusPopoverFrame';
import { FocusTopNav } from './FocusTopNav';
import { HistoryFilterBar } from './HistoryFilterBar';
import { HistorySessionList } from './HistorySessionList';
import { HistorySummaryFooter } from './HistorySummaryFooter';

const topNavTabs = [
  { id: 'focus', label: 'Focus' },
  { id: 'history', label: 'History', isActive: true },
  { id: 'stats', label: 'Stats' },
];

const historyItems = [
  {
    id: 'vscode',
    appName: 'VS Code',
    duration: '45m',
    timestamp: 'Today, 2:40 PM',
    note: 'Refactoring the design system components and updating Tailwind tokens...',
    iconUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCl85UWwMX5ezzVXa9nwtzkPq-V5xfeQPSaQeJ8udxMo6LRtv7-U3AR8xy82jKZc-C3mtm6VgI0ES-zRyW89Wx9cjVirNcDaghyagBFBnWo9ZZIE0CzorBwhm84ENK6m6sbKGIqu6pHPPo1XRQShC8HEW2IqtRPGzoEFaMoXVxzJnQWNdUKBdnBib0mAsH53P5MK8QCYVHfMaeXodMt0rSG7jci2Hyi3gO_d-9F6H42OK-S-NQ2K7aGoHIwFlbXGh7WxYWkhGIcLyc',
    iconAlt: 'VS Code Icon',
    iconBackgroundColor: 'rgba(0, 112, 235, 0.12)',
  },
  {
    id: 'chrome',
    appName: 'Google Chrome',
    duration: '1h 12m',
    timestamp: 'Today, 11:15 AM',
    note: 'Researching micro-interactions and animation patterns for the new landing page.',
    iconUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDMH9hC8RahrA-t54T0aQfceUy3upShfdTzXUO4t1G0MFaeq1uNxm2X-AaddKWLedo2e_m0xx1dF7taXjOWMfIXwWx7zkiwg1Oebpr81UNwPh73UyEi4yTighhSr_5sUrDkvSb0eo8IDSa2omvgspPO5QdvdFDFxvOCBSb5QMao6fNehbbt2vqPbbn7eNsmo_rhF7OCQr1tyub-es5UvzYi_AOokrUIISEapr2XHhcu7QKGif4A0olnyyLEompfkSc6ax3-ngHdl4',
    iconAlt: 'Chrome Icon',
  },
  {
    id: 'figma',
    appName: 'Figma',
    duration: '2h 05m',
    timestamp: 'Yesterday, 4:20 PM',
    note: 'High-fidelity prototyping for the dashboard mobile view and user flows.',
    iconUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ1PyjnEXtM-Af9jrvAuWcDTR8UD3_-Fjc75EGUtPcl6b1cIQ9Ny-isOQ8odeMFOz4dyLZTvPxM6hIhdn4naRMYN9kV3fwKsdmkyXEYU1djKf5y5Jo11SM7F06vBP-mOLDEATGPvs9vFg9t2rfJUhPsh2AsU4eURmnGY2cla7BM51WmmM4qjxzt68tlGt8ole1e9qeojOcuPQIwhYIcc6V6m2pQOezVB1wIudJGHv37Ag-WSTbSJX9dKU1pFtaLApGDAForytx3ec',
    iconAlt: 'Figma Icon',
    iconBackgroundColor: 'rgba(244, 114, 182, 0.14)',
  },
  {
    id: 'notion',
    appName: 'Notion',
    duration: '30m',
    timestamp: 'Yesterday, 9:00 AM',
    note: 'Weekly planning and backlog grooming session with the team.',
    iconUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ0KPGgFregJrLP0Xftr4w1AFf_FnJ-r0_3BkxzyvR5PHAoJTOKw9BP4Q09nVzuWj_6mnxb4WbelsKdnvSAYR9mU36ablxhaq-TPMp8-w7znoX15VjYbdhw697eLEGWZSQaJaw8zzniyhiynT9GtBSv3nTQAZZZMciZ4k7TC4six_cmNjYDTQdH4pE1IIE3W4Xtqk-0QOZFLf2cjMHlas2MfKIS9UmGjoj7wl2-ZTrKYyNENi7L71u5jH_nO_EnoKPs4xx2NcOD90',
    iconAlt: 'Notion Icon',
  },
  {
    id: 'slack',
    appName: 'Slack',
    duration: '15m',
    timestamp: 'Oct 24, 10:45 AM',
    note: 'Quick catch-up on project status and clearing pending PR reviews.',
    iconUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAujj8lb8nWIubwBp4zjSAsB6knpofJo29uEYEDMHL2IpjIK4tJTH2ftg9cDVjyZWv0qsSBUEDBoFfYtLwjVmTbt5AOovgbxVUwT-xiu5jiSgBcCBBrqUTK_Kzn4v4fepjDXr094Xd69a2jxZYqeCpO5q19Kj9pbT8zhz0CfiijoN718-yJL8xm_obl8aJ42m2cUsqN14d6dP9PVXET73uKUHgX0myNEukYgnK1YOVc2wBt2HWWR6XaR_1x1OinT6K2eWGpmOHfjT8',
    iconAlt: 'Slack Icon',
    iconBackgroundColor: 'rgba(147, 51, 234, 0.1)',
  },
];

export function FocusHistoryLayout() {
  return (
    <FocusPopoverFrame
      ariaLabel="Petite Focus history panel"
      paperSx={{
        backdropFilter: 'blur(24px)',
        backgroundColor: 'rgba(243, 243, 245, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 24px 48px rgba(15, 23, 42, 0.2)',
        height: 400,
      }}
    >
      <FocusTopNav title="Petite Focus" tabs={topNavTabs} showDivider={false} />

      <HistoryFilterBar title="Recent Sessions" chipLabel="Last 7 Days" />

      <HistorySessionList items={historyItems} />

      <HistorySummaryFooter summaryLabel="6.4h focused" actionLabel="View All History" />
    </FocusPopoverFrame>
  );
}
