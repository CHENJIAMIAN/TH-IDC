import defaultSettings from '@/settings'

const title = defaultSettings.title || '潼湖数据中心动环监控系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
