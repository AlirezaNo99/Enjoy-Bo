import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  Tooltip,
  CardActionArea,
  Container,
  styled
} from '@mui/material';
import SidebarLayout from 'src/layouts/SidebarLayout';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import TextField from '@mui/material/TextField';
import { Form, Row, Col, InputGroup, Modal, Dropdown } from 'react-bootstrap';
import PageHeader from 'src/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
// import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  CModalBody,
  CCard,
  CCardHeader,
  CModal,
  CModalFooter,
  CTextarea,
  CFormSelect,
  CButton
} from '@coreui/react';
function addproducts() {
  const AvatarWrapper = styled(Avatar)(
    ({ theme }) => `
      margin: ${theme.spacing(2, 0, 1, -0.5)};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: ${theme.spacing(1)};
      padding: ${theme.spacing(0.5)};
      border-radius: 60px;
      height: ${theme.spacing(5.5)};
      width: ${theme.spacing(5.5)};
      background: ${
        theme.palette.mode === 'dark'
          ? theme.colors.alpha.trueWhite[30]
          : alpha(theme.colors.alpha.black[100], 0.07)
      };
    
      img {
        background: ${theme.colors.alpha.trueWhite[100]};
        padding: ${theme.spacing(0.5)};
        display: block;
        border-radius: inherit;
        height: ${theme.spacing(4.5)};
        width: ${theme.spacing(4.5)};
      }
  `
  );

  const AvatarAddWrapper = styled(Avatar)(
    ({ theme }) => `
          background: ${theme.colors.alpha.black[10]};
          color: ${theme.colors.primary.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
  `
  );
  const Tiptap = () => {
    const editor = useEditor({
      extensions: [StarterKit],
      content: '<p>Hello World! 🌎️</p>'
    });

    return <EditorContent editor={editor} />;
  };
  const CardAddAction = styled(Card)(
    ({ theme }) => `
          border: ${theme.colors.primary.main} dashed 1px;
          height: 100%;
          color: ${theme.colors.primary.main};
          transition: ${theme.transitions.create(['all'])};
          
          .MuiCardActionArea-root {
            height: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
          }
          
          .MuiTouchRipple-root {
            opacity: .2;
          }
          
          &:hover {
            border-color: ${theme.colors.alpha.black[70]};
          }
  `
  );

  const [pricingType, setPricingType] = useState(null);

  console.log(pricingType);
  return (
    <>
      <Head>
        <title>محصول جدید</title>
      </Head>
      {/* <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper> */}
      <Container maxWidth="lg">
        <Grid md={8} xs={12} className="mt-20">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              pb: 3
            }}
          >
            <Typography variant="h3" className="col-12 mb-10">
              عکس ها
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} md={2} item className="py-0 mb-10">
              <Tooltip arrow title="برای اضافه کردن عکس جدید کلیک کنید">
                <CardAddAction>
                  <CardActionArea
                    sx={{
                      px: 1
                    }}
                  >
                    <CardContent>
                      <AvatarAddWrapper>
                        <AddTwoToneIcon fontSize="large" />
                      </AvatarAddWrapper>
                    </CardContent>
                  </CardActionArea>
                </CardAddAction>
              </Tooltip>
            </Grid>
            <div
              className="col-12 col-md-10 row "
              style={{ overflowX: 'scroll' }}
            >
              <div className="w-100 row">
                {' '}
                <Grid xs={12} sm={6} md={3} item className="mb-10">
                  <Card
                    sx={{
                      px: 1
                    }}
                  >
                    <CardContent>
                      <img
                        src=""
                        style={{
                          height: '118px',
                          width: 'auto',
                          margin: 'auto'
                        }}
                      />
                      <Box
                        sx={{
                          pt: 3
                        }}
                      >
                        <Typography variant="h3" gutterBottom noWrap>
                          $3,586.22
                        </Typography>
                        <Typography variant="subtitle2" noWrap>
                          1.25843 BTC
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3} item className="mb-10">
                  <Card
                    sx={{
                      px: 1
                    }}
                  >
                    <CardContent>
                      <img
                        src=""
                        style={{
                          height: '118px',
                          width: 'auto',
                          margin: 'auto'
                        }}
                      />
                      <Box
                        sx={{
                          pt: 3
                        }}
                      >
                        <Typography variant="h3" gutterBottom noWrap>
                          $3,586.22
                        </Typography>
                        <Typography variant="subtitle2" noWrap>
                          1.25843 BTC
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3} item className="mb-10">
                  <Card
                    sx={{
                      px: 1
                    }}
                  >
                    <CardContent>
                      <AvatarWrapper>
                        <img
                          alt="Ripple"
                          src="/static/images/placeholders/logo/ripple.png"
                        />
                      </AvatarWrapper>
                      <Typography variant="h5" noWrap>
                        Ripple
                      </Typography>
                      <Typography variant="subtitle1" noWrap>
                        XRP
                      </Typography>
                      <Box
                        sx={{
                          pt: 3
                        }}
                      >
                        <Typography variant="h3" gutterBottom noWrap>
                          $586.83
                        </Typography>
                        <Typography variant="subtitle2" noWrap>
                          5,783 XRP
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3} item className="mb-10">
                  <Card
                    sx={{
                      px: 1
                    }}
                  >
                    <CardContent>
                      <AvatarWrapper>
                        <img
                          alt="Cardano"
                          src="/static/images/placeholders/logo/cardano.png"
                        />
                      </AvatarWrapper>
                      <Typography variant="h5" noWrap>
                        Cardano
                      </Typography>
                      <Typography variant="subtitle1" noWrap>
                        ADA
                      </Typography>
                      <Box
                        sx={{
                          pt: 3
                        }}
                      >
                        <Typography variant="h3" gutterBottom noWrap>
                          $54,985.00
                        </Typography>
                        <Typography variant="subtitle2" noWrap>
                          34,985 ADA
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid md={8} xs={12} className="mt-20">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              pb: 3
            }}
          >
            <Typography variant="h3" className="col-12 mb-10">
              مشخصات محصول{' '}
            </Typography>
          </Box>
          <Card>
            <Grid spacing={0} container component="form" className="p-10">
              <Form.Group
                as={Col}
                lg={8}
                className="mt-10 p-10"
                style={{ textAlign: 'right' }}
              >
                <div style={{ marginBottom: '5px' }}> نام محصول *</div>

                <Form.Control value="" type="text" maxLength={19} />
              </Form.Group>
              <Form.Group
                as={Col}
                lg={4}
                className="mt-10 p-10"
                style={{ textAlign: 'right' }}
              >
                <div style={{ marginBottom: '5px' }}> گروه محصول *</div>

                <Form.Control value="" type="text" maxLength={19} />
              </Form.Group>
              <Form.Group
                as={Col}
                lg={4}
                className="mt-10 p-10"
                style={{ textAlign: 'right' }}
              >
                <div style={{ marginBottom: '5px' }}> برند محصول *</div>

                <Form.Control value="" type="text" maxLength={19} />
              </Form.Group>{' '}
              <Form.Group
                as={Col}
                lg={4}
                className="mt-10 p-10"
                style={{ textAlign: 'right' }}
              >
                <div style={{ marginBottom: '5px' }}> محصول ویژه؟*</div>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    height: 40
                  }}
                >
                  <CFormSelect
                    style={{ width: '100%', color: 'black' }}
                    onChange={(e) => {}}
                  >
                    <option value="">انتخاب</option>

                    <option value={true}>بله</option>
                    <option value={false}>خیر</option>
                  </CFormSelect>
                </div>{' '}
              </Form.Group>{' '}
              <Form.Group
                as={Col}
                lg={4}
                className="mt-10 p-10"
                style={{ textAlign: 'right' }}
              >
                <div style={{ marginBottom: '5px' }}> وضعیت *</div>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    height: 40
                  }}
                >
                  <CFormSelect
                    style={{ width: '100%', color: 'black' }}
                    onChange={(e) => {}}
                  >
                    <option value="">انتخاب</option>

                    <option value={true}>فعال</option>
                    <option value={false}>غیر فعال</option>
                  </CFormSelect>
                </div>{' '}
              </Form.Group>{' '}
              <Form.Group
                as={Col}
                lg={4}
                className="mt-10 p-10"
                style={{ textAlign: 'right' }}
              >
                <div style={{ marginBottom: '5px' }}> حداقل سفارش </div>

                <Form.Control value="" type="text" maxLength={19} />
              </Form.Group>{' '}
              <Form.Group
                as={Col}
                lg={4}
                className="mt-10 p-10"
                style={{ textAlign: 'right' }}
              >
                <div style={{ marginBottom: '5px' }}> حداکثر سفارش </div>

                <Form.Control value="" type="text" maxLength={19} />
              </Form.Group>{' '}
              <Form.Group
                as={Col}
                lg={4}
                className="mt-10 p-10"
                style={{ textAlign: 'right' }}
              >
                <div style={{ marginBottom: '5px' }}> توضیحات مختصر </div>

                <textarea
                  className="border-radius-5 form-border-color  w-100"
                  value=""
                  type="text"
                  maxLength={19}
                />
              </Form.Group>{' '}
              {/* <Tiptap /> */}
            </Grid>
            <Grid spacing={0} container component="form" className="p-10">
              <div className="col-12 text-center font-size-18 mt-50">
                حمل و نقل{' '}
              </div>
              <Form.Group
                as={Col}
                lg={4}
                className="mt-10 p-10"
                style={{ textAlign: 'right' }}
              >
                <div style={{ marginBottom: '5px' }}>وزن (گرم) </div>

                <Form.Control value="" type="text" maxLength={19} />
              </Form.Group>
              <Form.Group
                as={Col}
                lg={4}
                className="mt-10 p-10"
                style={{ textAlign: 'right' }}
              >
                <div style={{ marginBottom: '5px' }}>طول (سانتی متر) *</div>

                <Form.Control value="" type="text" maxLength={19} />
              </Form.Group>
              <Form.Group
                as={Col}
                lg={4}
                className="mt-10 p-10"
                style={{ textAlign: 'right' }}
              >
                <div style={{ marginBottom: '5px' }}> عرض (سانتی متر) *</div>

                <Form.Control value="" type="text" maxLength={19} />
              </Form.Group>{' '}
              <Form.Group
                as={Col}
                lg={4}
                className="mt-10 p-10"
                style={{ textAlign: 'right' }}
              >
                <div style={{ marginBottom: '5px' }}> ارتفاع (سانتی متر) *</div>

                <Form.Control value="" type="text" maxLength={19} />
              </Form.Group>{' '}
            </Grid>
            <Grid spacing={0} container component="form" className="p-10">
              <div className="col-12 text-center font-size-18 mt-50">
                قیمت و تعداد محصول{' '}
              </div>
              <Form.Group
                as={Col}
                lg={4}
                className="mt-10 p-10"
                style={{ textAlign: 'right' }}
              >
                <div style={{ marginBottom: '5px' }}>نوع قیمت گذاری</div>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    height: 40
                  }}
                >
                  <CFormSelect
                    style={{ width: '100%', color: 'black' }}
                    onChange={(e) => {
                      setPricingType(e.target.value);
                    }}
                  >
                    <option value="">انتخاب</option>

                    <option value={true}>تک قیمتی</option>
                    <option value={false}>براساس ویژگی</option>
                  </CFormSelect>
                </div>{' '}
              </Form.Group>
              <Form.Group
                as={Col}
                lg={4}
                className="mt-10 p-10"
                style={{ textAlign: 'right' }}
              >
                <div style={{ marginBottom: '5px' }}>واحد سنجش</div>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    height: 40
                  }}
                >
                  <CFormSelect
                    style={{ width: '100%', color: 'black' }}
                    onChange={(e) => {}}
                  >
                    <option value="">انتخاب</option>

                    <option value="1">عدد </option>
                    <option value="2">کیلوگرم</option>
                  </CFormSelect>
                </div>{' '}
              </Form.Group>
              {pricingType == 'true' ? (
                <>
                  <Form.Group
                    as={Col}
                    lg={4}
                    className="mt-10 p-10"
                    style={{ textAlign: 'right' }}
                  >
                    <div style={{ marginBottom: '5px' }}> موجودی محصول *</div>

                    <Form.Control value="" type="text" maxLength={19} />
                  </Form.Group>{' '}
                  <Form.Group
                    as={Col}
                    lg={4}
                    className="mt-10 p-10"
                    style={{ textAlign: 'right' }}
                  >
                    <div style={{ marginBottom: '5px' }}>
                      {' '}
                      قیمت پایه (تومان)*
                    </div>

                    <Form.Control value="" type="text" maxLength={19} />
                  </Form.Group>{' '}
                  <Form.Group
                    as={Col}
                    lg={4}
                    className="mt-10 p-10"
                    style={{ textAlign: 'right' }}
                  >
                    <div style={{ marginBottom: '5px' }}>
                      {' '}
                      قیمت فروش (تومان)*
                    </div>

                    <Form.Control value="" type="text" maxLength={19} />
                  </Form.Group>{' '}
                  <Form.Group
                    as={Col}
                    lg={4}
                    className="mt-10 p-10"
                    style={{ textAlign: 'right' }}
                  >
                    <div style={{ marginBottom: '5px' }}>تعداد *</div>

                    <Form.Control value="" type="text" maxLength={19} />
                  </Form.Group>{' '}
                </>
              ) : (
                <></>
              )}
              <div className="col-12 row ">
                <Button
                  sx={{ margin: 1 }}
                  variant="contained"
                  className="submit-butt col-2 "
                >
                  ثبت نهایی
                </Button>
              </div>
            </Grid>
          </Card>
        </Grid>
      </Container>
      {/* <Footer /> */}
    </>
  );
}
export default addproducts;

addproducts.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
