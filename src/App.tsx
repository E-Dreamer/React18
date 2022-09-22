/* eslint-disable eqeqeq */
import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, RouteObject } from 'react-router-dom'
import './App.css';
import { ConfigProvider } from 'antd'
import AuthRouter from '@/router/authRouter';
import Router, { filterAllRoutes, rootRouter } from '@/router'
import { useDispatch, useSelector } from 'react-redux';
import useTheme from './hooks/useTheme';
import { changeRoute, getBrowserLang } from './utils';
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import { setRouteData, setLanguage, setAllRouter } from './store/global';
import { getBackRoutes } from './api/modules/menu';

function App(props: any) {
  // const themeConfig = useSelector((state: any) => state.global.themeConfig)
  // const language = useSelector((state: any) => state.global.language)
  // const assemblySize = useSelector((state: any) => state.global.assemblySize)
  // const token = useSelector((state: any) => state.global.token)
  const { token, themeConfig, language, assemblySize } = useSelector((state: any) => state.global)
  const dispatch = useDispatch()

  const { weakOrGray } = themeConfig;
  const [i18nLocale, setI18nLocale] = useState(zhCN);

  const [backRoutes, setBackRoutes] = useState<RouteObject[]>([])
  // 全局使用主题
  useTheme(weakOrGray);
  // 设置 antd 语言国际化
  const setAntdLanguage = () => {
    // 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
    if (language && language == "zh") return setI18nLocale(zhCN);
    if (language && language == "en") return setI18nLocale(enUS);
    if (getBrowserLang() == "zh") return setI18nLocale(zhCN);
    if (getBrowserLang() == "en") return setI18nLocale(enUS);
  };

  useEffect(() => {
    // 全局使用国际化
    // i18n.changeLanguage(language || getBrowserLang());
    dispatch(setLanguage(language || getBrowserLang()))
    setAntdLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
  

  const getRoutes = async () => {
    try {
      const { data } = await getBackRoutes()
      if (!data) return;
      dispatch(setRouteData(data))
      const result = changeRoute(filterAllRoutes(data))
      console.log('后端返回的路由: ', result);
      dispatch(setAllRouter([...result, ...rootRouter]))
      setBackRoutes(result)
    } catch (err) {
      // console.log(err)
    }
  }
  // token 改变的时候获取菜单
  useEffect(() => {
    token && getRoutes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
  return (
    <BrowserRouter>
      <Suspense>
        <ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
          <AuthRouter>
            <Router backRoutes={backRoutes} />
          </AuthRouter>
        </ConfigProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
