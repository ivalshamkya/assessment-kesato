import {useLocale, useTranslations} from 'next-intl';
import LocaleSwitcherSelect from './LanguageSwitcherSelect';

export default function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale();


  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          label: t('en'),
          image: "https://vectorflags.s3-us-west-2.amazonaws.com/flags/uk-circle-01.png"
        },
        {
          value: 'id',
          label: t('id'),
          image: "https://vectorflags.s3-us-west-2.amazonaws.com/flags/id-circle-01.png"
        }
      ]}
      label={t('label')}
    />
  );
}
