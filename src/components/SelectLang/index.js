import React, { PureComponent } from 'react';
import { formatMessage, setLocale, getLocale } from 'umi-plugin-react/locale';
import { Menu, Icon, Dropdown } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

export default class SelectLang extends PureComponent {
  changeLang = ({ key }) => {
    setLocale(key);
  };

  render() {
    const { className } = this.props;
    const selectedLang = getLocale();
    const locales = ['vi-VN', 'en-US'];
    const languageLabels = {
      'vi-VN': 'Tiếng việt',
      'en-US': 'English',
    };
    const languageIcons = {
      'vi-VN': '🇻🇳',
      'en-US': '🇬🇧',
    };
    const langMenu = (
      <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={this.changeLang}>
        {locales.map(locale => (
          <Menu.Item key={locale}>
            <span role="img" aria-label={languageLabels[locale]}>
              {languageIcons[locale]}
            </span>{' '}
            {languageLabels[locale]}
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <Dropdown overlay={langMenu} placement="bottomRight">
        <span className={classNames(styles.dropDown, className)}>
          <Icon type="global" title={formatMessage({ id: 'navBar.lang' })} />
        </span>
      </Dropdown>
    );
  }
}
