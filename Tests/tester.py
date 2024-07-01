import unittest
import requests
import json

class UFTests(unittest.TestCase):
    invalid_source_request_data_1 = None
    invalid_source_request_data_2 = None
    invalid_source_request_data_3 = None

    @classmethod
    def setUpClass(cls):
        cls.base_url = "http://localhost:3000/api/uf"
        cls.api_url = "https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=620577de89171e9bf39412bc3e39ff72977c11e6&formato=json"
        response = requests.get(cls.api_url)
        cls.uf = response.json()

        cls.api_url2 = "https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/2024/05/dias/17?apikey=620577de89171e9bf39412bc3e39ff72977c11e6&formato=json"
        response2 = requests.get(cls.api_url2)
        cls.uf2 = response2.json()

        cls.invalid_source_request_data_1 = {
            "nombre": "Carlos",
            "apellido": "Santana",
            "rut": "21117476-K",
            "email": "jjjameson@spiderman.com",
            "monto": "-500",
            "tasa": "5",
            "plazo": "12"
        }
        cls.invalid_source_request_data_2 = {
            "nombre": "Carlos",
            "apellido": "Santana",
            "rut": "21117476-K",
            "email": "jjjameson@spiderman.com",
            "monto": "5000",
            "tasa": "5",
            "plazo": "-12"
        }
    
    @classmethod
    def tearDownClass(cls):
        del cls.invalid_source_request_data_1
        del cls.invalid_source_request_data_2
        del cls.uf
        del cls.uf2

    def test_UF(self):
        uf = self.uf['UFs'][0]['Valor']
        numero = uf.replace('.', '').replace(',', '.')

        self.assertEqual(37312.63, float(numero))
    def test_UF_semana(self):
        uf2 = self.uf2['UFs'][0]['Valor']
        numero2 = uf2.replace('.', '').replace(',', '.')

        self.assertEqual(37354.68, float(numero2))
    def test_monto(self):
        response = requests.post(self.base_url, json = self.invalid_source_request_data_1)

        monto = json.loads(response.json()["body"])["monto"]

        self.assertEqual("Error", str(monto))

    def test_monto(self):
        response = requests.post(self.base_url, json = self.invalid_source_request_data_2)

        plazo = json.loads(response.json()["body"])["plazo"]

        self.assertEqual("Error", str(plazo))


if __name__ =='__main__':
    unittest.main()