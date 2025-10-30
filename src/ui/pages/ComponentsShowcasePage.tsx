import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Page } from 'ui-kit/components/Page/Page';
import { Container } from 'ui-kit/components/Container/Container';
import { Flex } from 'ui-kit/components/Layout/Flex';
import { Grid, Row, Col } from 'ui-kit/components/Layout/Grid';
import { Button } from 'ui-kit/components/Button/Button';
import { Input } from 'ui-kit/components/Input/Input';
import { Text } from 'ui-kit/components/Typography/Text';
import { Title } from 'ui-kit/components/Typography/Title';
import { Tabs } from 'ui-kit/components/Tabs/Tabs';
import { Chip } from 'ui-kit/components/Chip/Chip';
import { Card } from 'ui-kit/components/Card/Card';
import { Avatar } from 'ui-kit/components/Avatar/Avatar';
import { Spacer } from 'ui-kit/components/Spacer/Spacer';
import { SearchInput } from 'ui-kit/components/SearchInput/SearchInput';
import { SegmentedControl } from 'ui-kit/components/SegmentedControl/SegmentedControl';
import { Tooltip } from 'ui-kit/components/Tooltip/Tooltip';
import { TextArea } from 'ui-kit/components/TextArea/TextArea';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';
import { IconButton } from 'ui-kit/components/IconButton/IconButton';
import { Modal } from 'ui-kit/components/Modal/Modal';
import { Drawer } from 'ui-kit/components/Drawer/Drawer';
import { MediaCard } from 'ui-kit/components/MediaCard/MediaCard';
import { Player } from 'ui-kit/components/Player/Player';
import Carousel from 'ui-kit/components/Carousel/Carousel';
import { Sider } from 'ui-kit/components/Sider/Sider';
import { Select } from 'ui-kit/components/Select/Select';
import { Switch } from 'ui-kit/components/Switch/Switch';
import { Checkbox } from 'ui-kit/components/Checkbox/Checkbox';
import { Radio } from 'ui-kit/components/Radio/Radio';
import { Pagination } from 'ui-kit/components/Pagination/Pagination';
import { Breadcrumb } from 'ui-kit/components/Breadcrumb/Breadcrumb';
import { Table } from 'ui-kit/components/Table/Table';
import { Tag } from 'ui-kit/components/Tag/Tag';
import { Badge } from 'ui-kit/components/Badge/Badge';
import { Collapse } from 'ui-kit/components/Collapse/Collapse';
import { DatePicker } from 'ui-kit/components/DatePicker/DatePicker';
import { TimePicker } from 'ui-kit/components/TimePicker/TimePicker';
import { Upload } from 'ui-kit/components/Upload/Upload';
import { message } from 'ui-kit/components/Message/Message';
import { Rating } from 'ui-kit/components/Rating/Rating';
import { Popover } from 'ui-kit/components/Popover/Popover';
import { Dropdown } from 'ui-kit/components/Dropdown/Dropdown';
import { Menu } from 'ui-kit/components/Menu/Menu';
import { Popconfirm } from 'ui-kit/components/Popconfirm/Popconfirm';
import { Steps } from 'ui-kit/components/Steps/Steps';
import { Progress } from 'ui-kit/components/Progress/Progress';
import { Slider } from 'ui-kit/components/Slider/Slider';
import { Skeleton } from 'ui-kit/components/Skeleton/Skeleton';
import notification from 'ui-kit/components/Notification/Notification';
import PreviewImage from 'ui-kit/components/ImagePreview/Image';
import { Empty } from 'ui-kit/components/Empty/Empty';
import { SectionHeader } from 'ui-kit/components/SectionHeader/SectionHeader';
import { List, ListItem } from 'ui-kit/components/List/List';
import { BottomNavigation } from 'ui-kit/components/BottomNavigation/BottomNavigation';
import { AppBar } from 'ui-kit/components/AppBar/AppBar';
import { SearchBar } from 'ui-kit/components/SearchBar/SearchBar';
import { Combobox } from 'ui-kit/components/Combobox/Combobox';
import { HorizontalList } from 'ui-kit/components/HorizontalList/HorizontalList';
import { SafeAreaBottom, SafeAreaTop } from 'ui-kit/components/SafeArea/SafeArea';
import { ToastProvider, useToast } from 'ui-kit/components/Toast/Toast';
import { FormField } from 'ui-kit/components/Form/FormField';

const DemoToasts: React.FC = () => {
  const { show } = useToast();
  return (
    <Flex gap={8}>
      <Button onClick={() => show('Инфо')}>Info</Button>
      <Button onClick={() => show('Готово', 'success')}>Success</Button>
      <Button onClick={() => show('Ошибка', 'error')}>Error</Button>
    </Flex>
  );
};

export const ComponentsShowcasePage: React.FC = () => {
  const [tabKey, setTabKey] = useState('tab1');
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [segment, setSegment] = useState('a');
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const [switchOn, setSwitchOn] = useState(false);
  const [page, setPage] = useState(1);
  const [rating, setRating] = useState(3);

  return (
    <ToastProvider>
    <Page topOffset='md'>
      <Container>
        <Title level={2}>Компоненты</Title>
        <Text>Живые примеры базовых элементов из UI‑кита.</Text>
        <Spacer size={16} />
        <SectionHeader action={<Button variant='link'>Действие</Button>}>SectionHeader</SectionHeader>

        <Spacer size={16} />
        <Title level={3}>Empty</Title>
        <Empty description='Список пуст. Добавьте элементы.' />

        <Spacer size={16} />
        <Title level={3}>List</Title>
        <List>
          <ListItem leading={<Avatar alt='a' />} title='Элемент списка' description='Описание' trailing={<Button size='sm'>Действие</Button>} />
          <ListItem title='Без иконки' description='Ещё описание' />
        </List>

        <Spacer size={16} />
        <Title level={3}>HorizontalList</Title>
        <HorizontalList>
          <Card title='A' />
          <Card title='B' />
          <Card title='C' />
        </HorizontalList>

        <Spacer size={16} />
        <Title level={3}>AppBar / SearchBar / Combobox</Title>
        <AppBar title={<Text>Заголовок</Text>} right={<Button size='sm'>Action</Button>} />
        <Spacer size={8} />
        <SearchBar value={''} onChange={() => {}} placeholder='Поиск...' />
        <Spacer size={8} />
        <Combobox options={[{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 }]} placeholder='Выберите' />

        <Spacer size={16} />
        <Title level={3}>Toast</Title>
        <DemoToasts />

        <Spacer size={16} />
        <Title level={3}>Formik + Yup</Title>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={Yup.object({ email: Yup.string().email('Неверный email').required('Обязательно') })}
          onSubmit={() => {}}
        >
          <Form>
            <Grid cols={2} gap={12} responsive>
              <FormField name='email' label='Email'>
                {(field) => <Input {...field} placeholder='you@example.com' />}
              </FormField>
            </Grid>
          </Form>
        </Formik>


        <Spacer size={16} />

        <Title level={3}>Кнопки</Title>
        <Flex gap={8} wrap>
          <Button>Default</Button>
          <Button variant='primary'>Primary</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='danger'>Danger</Button>
          <Button variant='dashed'>Dashed</Button>
          <Button variant='text'>Text</Button>
          <Button variant='link'>Link</Button>
        </Flex>
        <Spacer size={8} />
        <Flex gap={8} wrap>
          <Button size='sm'>Small</Button>
          <Button size='md'>Medium</Button>
          <Button size='lg'>Large</Button>
          <Button disabled>Disabled</Button>
          <Button loading variant='primary'>Loading</Button>
          <Button shape='round' variant='primary'>Round</Button>
          <Button shape='circle' aria-label='star' variant='primary'>★</Button>
        </Flex>

        <Spacer size={12} />
        <Flex gap={8} wrap>
          <IconButton aria-label='icon'>★</IconButton>
          <IconButton variant='primary' aria-label='icon'>★</IconButton>
          <IconButton variant='ghost' aria-label='icon'>★</IconButton>
        </Flex>

        <Spacer size={24} />

        <Title level={3}>Поля ввода</Title>
        <Grid cols={3} gap={12} responsive>
          <Input placeholder='Обычный ввод' />
          <Input placeholder='Неверное значение' invalid />
          <Input placeholder='С подсказкой placeholder' />
        </Grid>
        <Spacer size={8} />
        <Grid cols={2} gap={12} responsive>
          <SearchInput placeholder='Поиск' />
          <TextArea rows={3} placeholder='Многострочное поле' />
        </Grid>
        <Spacer size={8} />
        <Grid cols={3} gap={12} responsive>
          <Select allowClear options={[{ label: 'One', value: '1' }, { label: 'Two', value: '2' }]} placeholder='Select' />
          <DatePicker />
          <TimePicker />
        </Grid>

        <Spacer size={24} />

        <Title level={3}>Вкладки</Title>
        <Tabs
          items={[
            { key: 'tab1', label: 'Первая', content: <Text>Контент первой вкладки</Text> },
            { key: 'tab2', label: 'Вторая', content: <Text>Контент второй вкладки</Text> },
            { key: 'tab3', label: 'Третья', content: <Text>Контент третьей вкладки</Text> },
          ]}
          defaultActiveKey={tabKey}
          onChange={setTabKey}
        />

        <Spacer size={24} />

        <Title level={3}>Чипы</Title>
        <Flex gap={8} wrap>
          <Chip>Action</Chip>
          <Chip selected>Selected</Chip>
          <Chip disabled>Disabled</Chip>
        </Flex>
        <Spacer size={8} />
        <SegmentedControl
          items={[{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }, { key: 'c', label: 'C' }]}
          value={segment}
          onChange={setSegment}
        />
        <Spacer size={8} />
        <Flex gap={12} align='center'>
          <Switch checked={switchOn} onChange={setSwitchOn} />
          <Checkbox defaultChecked>Checkbox</Checkbox>
          <Flex gap={8}>
            <Radio name='r' defaultChecked>Radio A</Radio>
            <Radio name='r'>Radio B</Radio>
          </Flex>
        </Flex>

        <Spacer size={24} />

        <Title level={3}>Карточка и аватар</Title>
        <Grid cols={3} gap={12} responsive>
          <Card title='Пример карточки' description='Краткое описание карточки' />
          <Card title='Карточка c кнопкой' description='Внутри произвольный контент'>
            <Spacer size={8} />
            <Button variant='primary' block>Действие</Button>
          </Card>
          <Flex direction='row' gap={12} align='center'>
            <Avatar src='' alt='avatar' />
            <Text>Аватар по умолчанию</Text>
          </Flex>
        </Grid>

        <Spacer size={24} />

        <Title level={3}>Медиа карточка</Title>
        <MediaCard
          imageUrl='https://picsum.photos/400/240'
          bottomOverlay={<Flex direction='column'><Text>Заголовок</Text><Text size='sm'>Описание</Text></Flex>}
        />

        <Spacer size={24} />

        <Title level={3}>Карусель</Title>
        <Carousel showDots>
          <img src='https://picsum.photos/seed/1/600/300' alt='1' />
          <img src='https://picsum.photos/seed/2/600/300' alt='2' />
          <img src='https://picsum.photos/seed/3/600/300' alt='3' />
        </Carousel>

        <Spacer size={24} />

        <Title level={3}>Подсказка и спиннер</Title>
        <Flex gap={12} align='center'>
          <Tooltip content='Подсказка'>
            <Button>Наведи</Button>
          </Tooltip>
          <Spinner />
          <Tag closable onClose={() => message.info('Tag closed')}>Tag</Tag>
          <Badge count={12}><Button>Badge child</Button></Badge>
        </Flex>

        <Spacer size={24} />

        <Title level={3}>Модальные окна</Title>
        <Flex gap={8} wrap>
          <Button onClick={() => setModalOpen(true)} variant='primary'>Открыть модал</Button>
          <Button onClick={() => setDrawerOpen(true)}>Открыть выдвижную панель</Button>
        </Flex>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={<Title level={4}>Пример модального окна</Title>} footer={<Button onClick={() => setModalOpen(false)}>Закрыть</Button>}>
          <Text>Содержимое модального окна</Text>
        </Modal>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Container>
            <Title level={4}>Выдвижная панель</Title>
            <Text>Любой контент</Text>
          </Container>
        </Drawer>

        <Spacer size={24} />

        <Title level={3}>Сайдбар</Title>
        <Flex gap={8} align='center'>
          <Button onClick={() => setSiderCollapsed(v => !v)}>
            {siderCollapsed ? 'Открыть' : 'Закрыть'}
          </Button>
          <Sider collapsed={siderCollapsed}>
            <Flex direction='column' gap={8}>
              <Button variant='ghost'>Пункт 1</Button>
              <Button variant='ghost'>Пункт 2</Button>
            </Flex>
          </Sider>
        </Flex>

        <Spacer size={24} />

        <Title level={3}>Навигация и таблица</Title>
        <Breadcrumb items={[{ title: 'Дом' }, { title: 'Раздел' }, { title: 'Страница' }]} />
        <Spacer size={8} />
        <Table
          columns={[{ title: 'Имя', dataIndex: 'name' }, { title: 'Возраст', dataIndex: 'age' }]}
          dataSource={[{ name: 'Анна', age: 20 }, { name: 'Иван', age: 24 }]}
          rowKey={(r) => String(r.name)}
        />
        <Spacer size={8} />
        <Pagination current={page} total={50} onChange={(p) => setPage(p)} />

        <Spacer size={24} />

        <Title level={3}>Сворачиваемые блоки</Title>
        <Collapse items={[{ key: '1', label: 'Заголовок 1', children: <Text>Контент</Text> }, { key: '2', label: 'Заголовок 2', children: <Text>Контент</Text> }]} />

        <Spacer size={24} />

        <Title level={3}>Загрузка файлов</Title>
        <Upload onChange={(files) => message.success(`Загружено: ${files.length}`)}>
          <Button>Выбрать файл</Button>
        </Upload>

        <Spacer size={24} />

        <Title level={3}>Плеер</Title>
        <Player src='' poster='https://picsum.photos/seed/poster/640/360' />

        <Spacer size={24} />

        <Title level={3}>Рейтинг</Title>
        <Flex gap={12} align='center'>
          <Rating value={rating} onChange={setRating} allowClear size={16} />
          <Rating defaultValue={2} size={'1.5rem'} />
          <Rating defaultValue={4} size={24} />
          <Text>Выбрано: {rating}</Text>
        </Flex>

        <Spacer size={24} />

        <Title level={3}>Оверлеи</Title>
        <Flex gap={12} align='center'>
          <Popover title="Заголовок" content={<Text>Текст подсказки</Text>}>
            <Button>Popover</Button>
          </Popover>
          <Dropdown menu={{ items: [{ key: '1', label: 'Действие' }, { key: '2', label: 'Удалить', danger: true }] }}>
            <Button>Dropdown</Button>
          </Dropdown>
          <Popconfirm title={<Text>Вы уверены?</Text>} onConfirm={() => message.success('OK')} onCancel={() => message.info('Cancel')}>
            <Button variant='danger'>Popconfirm</Button>
          </Popconfirm>
        </Flex>

        <Spacer size={24} />

        <Title level={3}>Шаги, прогресс, слайдер</Title>
        <Steps current={1} items={[{ title: 'Шаг 1' }, { title: 'Шаг 2' }, { title: 'Шаг 3' }]} />
        <Spacer size={8} />
        <Progress percent={66} />
        <Spacer size={8} />
        <Slider defaultValue={30} />

        <Spacer size={24} />

        <Title level={3}>Skeleton</Title>
        <Skeleton avatar rows={3} />

        <Spacer size={24} />

        <Title level={3}>Notification</Title>
        <Flex gap={8}>
          <Button onClick={() => notification.open({ message: 'Заголовок', description: 'Описание уведомления' })}>Стандарт</Button>
          <Button onClick={() => notification.open({ message: 'Закрываемое', description: 'Можно закрыть вручную', closable: true })}>Closable</Button>
        </Flex>

        <Spacer size={24} />

        <Title level={3}>Image с превью</Title>
        <PreviewImage src='https://picsum.photos/seed/p/400/240' alt='preview' />

        <Spacer size={24} />

        <Title level={3}>Row / Col</Title>
        <Row gutter={16}>
          <Col xs={24} md={12} lg={8}><Card title='Колонка A' /></Col>
          <Col xs={24} md={12} lg={8}><Card title='Колонка B' /></Col>
          <Col xs={24} md={12} lg={8}><Card title='Колонка C' /></Col>
        </Row>

      </Container>
      <SafeAreaBottom />
      <BottomNavigation items={[
        { key: 'home', to: '/', icon: '🏠', label: 'Главная' },
        { key: 'b', to: '/bookmarks', icon: '🔖', label: 'Закладки' },
        { key: 'c', to: '/collections', icon: '🗂', label: 'Коллекции' },
        { key: 'f', to: '/feed', icon: '📰', label: 'Лента' },
        { key: 'p', to: '/profile', icon: '👤', label: 'Профиль' },
      ]} />
    </Page>
    </ToastProvider>
  );
};

export default ComponentsShowcasePage;


