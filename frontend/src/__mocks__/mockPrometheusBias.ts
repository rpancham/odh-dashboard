/* eslint-disable camelcase */
import { PrometheusQueryRangeResponse, PrometheusQueryRangeResponseDataResult } from '~/types';

type MockPrometheusServingType = {
  result?: PrometheusQueryRangeResponseDataResult[];
  modelName?: string;
  namespace?: string;
  metric?: 'SPD' | 'DIR';
};

export const mockPrometheusBias = ({
  result,
  metric = 'SPD',
}: MockPrometheusServingType): {
  code?: number;
  response: PrometheusQueryRangeResponse;
} => {
  const SPDResult: PrometheusQueryRangeResponseDataResult[] = [
    {
      metric: {
        pod: 'trustyai-service-5647b69dbb-vnjpr',
        request: '46142e1e-5abb-44b4-941b-f7a2937fbc23',
      },
      values: [
        [1704886625.66, '-0.5498586823373708'],
        [1704888641.66, '-0.5350562166294764'],
        [1704890657.66, '-0.5392727475721202'],
        [1704892673.66, '-0.5444865445249031'],
        [1704894689.66, '-0.5392727475721202'],
        [1704896705.66, '-0.5268452287718199'],
        [1704898721.66, '-0.5383181959075529'],
        [1704900737.66, '-0.5556633086860667'],
        [1704902753.66, '-0.5597069847677038'],
        [1704904769.66, '-0.5360110481318209'],
        [1704906785.66, '-0.5287817596042094'],
        [1704908801.66, '-0.5225411884452952'],
        [1704910817.66, '-0.5347585156624809'],
        [1704912833.66, '-0.5347585156624809'],
        [1704914849.66, '-0.5347585156624809'],
        [1704916865.66, '-0.5347585156624809'],
        [1704918881.66, '-0.5347585156624809'],
        [1704920897.66, '-0.5347585156624809'],
        [1704922913.66, '-0.5347585156624809'],
        [1704924929.66, '-0.5347585156624809'],
        [1704926945.66, '-0.5347585156624809'],
        [1704928961.66, '-0.5347585156624809'],
        [1704930977.66, '-0.5347585156624809'],
        [1704932993.66, '-0.5347585156624809'],
        [1704935009.66, '-0.5347585156624809'],
        [1704937025.66, '-0.5347585156624809'],
        [1704939041.66, '-0.5347585156624809'],
        [1704941057.66, '-0.5347585156624809'],
        [1704943073.66, '-0.5347585156624809'],
        [1704945089.66, '-0.5347585156624809'],
        [1704947105.66, '-0.5347585156624809'],
        [1704949121.66, '-0.5347585156624809'],
        [1704951137.66, '-0.5347585156624809'],
        [1704953153.66, '-0.5347585156624809'],
        [1704955169.66, '-0.5347585156624809'],
        [1704957185.66, '-0.5347585156624809'],
        [1704959201.66, '-0.5347585156624809'],
        [1704961217.66, '-0.5347585156624809'],
        [1704963233.66, '-0.5347585156624809'],
        [1704965249.66, '-0.5347585156624809'],
        [1704967265.66, '-0.5347585156624809'],
        [1704969281.66, '-0.5315725285254884'],
        [1704971297.66, '-0.5431684278617366'],
        [1704973313.66, '-0.5672016151977834'],
        [1704975329.66, '-0.5498449825159609'],
        [1704977345.66, '-0.5503243959918226'],
        [1704979361.66, '-0.5371490258781355'],
        [1704981377.66, '-0.5464200331432458'],
        [1704983393.66, '-0.5423813902445046'],
        [1704985409.66, '-0.5503243959918226'],
        [1704987425.66, '-0.5492198951989571'],
      ],
    },
    {
      metric: {
        pod: 'trustyai-service-5647b69dbb-vnjpr',
        request: '659b65b4-a711-41e9-9018-b98a465597ce',
      },
      values: [
        [1704914849.66, '-0.5347585156624809'],
        [1704916865.66, '-0.5347585156624809'],
        [1704918881.66, '-0.5347585156624809'],
        [1704920897.66, '-0.5347585156624809'],
        [1704922913.66, '-0.5347585156624809'],
        [1704924929.66, '-0.5347585156624809'],
        [1704926945.66, '-0.5347585156624809'],
        [1704928961.66, '-0.5347585156624809'],
        [1704930977.66, '-0.5347585156624809'],
        [1704932993.66, '-0.5347585156624809'],
        [1704935009.66, '-0.5347585156624809'],
        [1704937025.66, '-0.5347585156624809'],
        [1704939041.66, '-0.5347585156624809'],
        [1704941057.66, '-0.5347585156624809'],
        [1704943073.66, '-0.5347585156624809'],
        [1704945089.66, '-0.5347585156624809'],
        [1704947105.66, '-0.5347585156624809'],
        [1704949121.66, '-0.5347585156624809'],
        [1704951137.66, '-0.5347585156624809'],
        [1704953153.66, '-0.5347585156624809'],
        [1704955169.66, '-0.5347585156624809'],
        [1704957185.66, '-0.5347585156624809'],
        [1704959201.66, '-0.5347585156624809'],
        [1704961217.66, '-0.5347585156624809'],
        [1704963233.66, '-0.5347585156624809'],
        [1704965249.66, '-0.5347585156624809'],
        [1704967265.66, '-0.5347585156624809'],
        [1704969281.66, '-0.5347585156624809'],
        [1704971297.66, '-0.5347585156624809'],
        [1704973313.66, '-0.5347585156624809'],
        [1704975329.66, '-0.5347585156624809'],
        [1704977345.66, '-0.5347585156624809'],
        [1704979361.66, '-0.5347585156624809'],
        [1704981377.66, '-0.5347585156624809'],
        [1704983393.66, '-0.5347585156624809'],
        [1704985409.66, '-0.5347585156624809'],
        [1704987425.66, '-0.5347585156624809'],
      ],
    },
    {
      metric: {
        pod: 'trustyai-service-b46c5dc9-nkpvz',
        request: '04e63c51-8ce7-46f6-9909-822d2fe41019',
      },
      values: [
        [1704382625.66, '-0.5344555169949383'],
        [1704384641.66, '-0.5344555169949383'],
        [1704386657.66, '-0.5344555169949383'],
        [1704388673.66, '-0.5344555169949383'],
        [1704390689.66, '-0.5344555169949383'],
        [1704392705.66, '-0.5344555169949383'],
        [1704394721.66, '-0.5344555169949383'],
        [1704396737.66, '-0.5344555169949383'],
        [1704398753.66, '-0.5344555169949383'],
        [1704400769.66, '-0.5344555169949383'],
        [1704402785.66, '-0.5344555169949383'],
        [1704404801.66, '-0.5344555169949383'],
        [1704406817.66, '-0.5344555169949383'],
        [1704408833.66, '-0.5344555169949383'],
        [1704410849.66, '-0.5344555169949383'],
        [1704412865.66, '-0.5344555169949383'],
        [1704414881.66, '-0.5344555169949383'],
        [1704416897.66, '-0.5344555169949383'],
        [1704418913.66, '-0.5344555169949383'],
        [1704420929.66, '-0.5344555169949383'],
        [1704422945.66, '-0.5344555169949383'],
        [1704424961.66, '-0.5344555169949383'],
        [1704426977.66, '-0.5344555169949383'],
        [1704428993.66, '-0.5344555169949383'],
        [1704431009.66, '-0.5344555169949383'],
        [1704433025.66, '-0.5344555169949383'],
        [1704435041.66, '-0.5344555169949383'],
        [1704437057.66, '-0.5344555169949383'],
        [1704439073.66, '-0.5344555169949383'],
        [1704441089.66, '-0.5344555169949383'],
        [1704443105.66, '-0.5344555169949383'],
        [1704445121.66, '-0.5344555169949383'],
        [1704447137.66, '-0.5344555169949383'],
        [1704449153.66, '-0.5344555169949383'],
        [1704451169.66, '-0.5344555169949383'],
        [1704453185.66, '-0.5344555169949383'],
        [1704455201.66, '-0.5344555169949383'],
        [1704457217.66, '-0.5344555169949383'],
        [1704459233.66, '-0.5344555169949383'],
        [1704461249.66, '-0.5344555169949383'],
        [1704463265.66, '-0.5344555169949383'],
        [1704465281.66, '-0.5344555169949383'],
        [1704467297.66, '-0.5344555169949383'],
        [1704469313.66, '-0.5344555169949383'],
        [1704471329.66, '-0.5344555169949383'],
        [1704473345.66, '-0.5344555169949383'],
        [1704475361.66, '-0.5344555169949383'],
        [1704477377.66, '-0.5344555169949383'],
        [1704479393.66, '-0.5344555169949383'],
        [1704481409.66, '-0.5344555169949383'],
        [1704483425.66, '-0.5344555169949383'],
        [1704485441.66, '-0.5344555169949383'],
        [1704487457.66, '-0.5344555169949383'],
        [1704489473.66, '-0.5344555169949383'],
        [1704491489.66, '-0.5344555169949383'],
        [1704493505.66, '-0.5344555169949383'],
        [1704495521.66, '-0.5344555169949383'],
        [1704497537.66, '-0.5344555169949383'],
        [1704499553.66, '-0.5344555169949383'],
        [1704501569.66, '-0.5344555169949383'],
        [1704503585.66, '-0.5344555169949383'],
        [1704505601.66, '-0.5344555169949383'],
        [1704507617.66, '-0.5344555169949383'],
        [1704509633.66, '-0.5344555169949383'],
        [1704511649.66, '-0.5344555169949383'],
        [1704513665.66, '-0.5344555169949383'],
        [1704515681.66, '-0.5344555169949383'],
        [1704517697.66, '-0.5344555169949383'],
        [1704519713.66, '-0.5344555169949383'],
        [1704521729.66, '-0.5344555169949383'],
        [1704523745.66, '-0.5344555169949383'],
        [1704525761.66, '-0.5344555169949383'],
        [1704527777.66, '-0.5344555169949383'],
        [1704529793.66, '-0.5344555169949383'],
        [1704531809.66, '-0.5344555169949383'],
        [1704533825.66, '-0.5344555169949383'],
        [1704535841.66, '-0.5344555169949383'],
        [1704537857.66, '-0.5344555169949383'],
        [1704539873.66, '-0.5344555169949383'],
        [1704541889.66, '-0.5344555169949383'],
        [1704543905.66, '-0.5344555169949383'],
        [1704545921.66, '-0.5344555169949383'],
        [1704547937.66, '-0.5344555169949383'],
        [1704549953.66, '-0.5344555169949383'],
        [1704551969.66, '-0.5344555169949383'],
        [1704553985.66, '-0.5344555169949383'],
        [1704556001.66, '-0.5344555169949383'],
        [1704558017.66, '-0.5344555169949383'],
        [1704560033.66, '-0.5344555169949383'],
        [1704562049.66, '-0.5344555169949383'],
      ],
    },
    {
      metric: {
        pod: 'trustyai-service-b46c5dc9-nkpvz',
        request: '383def80-bd8a-4d2b-b775-5e850253f603',
      },
      values: [
        [1704467297.66, '-0.5344555169949383'],
        [1704469313.66, '-0.5344555169949383'],
        [1704471329.66, '-0.5344555169949383'],
        [1704473345.66, '-0.5344555169949383'],
        [1704475361.66, '-0.5344555169949383'],
        [1704477377.66, '-0.5344555169949383'],
        [1704479393.66, '-0.5344555169949383'],
        [1704481409.66, '-0.5344555169949383'],
        [1704483425.66, '-0.5344555169949383'],
        [1704485441.66, '-0.5344555169949383'],
        [1704487457.66, '-0.5344555169949383'],
        [1704489473.66, '-0.5344555169949383'],
        [1704491489.66, '-0.5344555169949383'],
        [1704493505.66, '-0.5344555169949383'],
        [1704495521.66, '-0.5344555169949383'],
        [1704497537.66, '-0.5344555169949383'],
        [1704499553.66, '-0.5344555169949383'],
        [1704501569.66, '-0.5344555169949383'],
        [1704503585.66, '-0.5344555169949383'],
        [1704505601.66, '-0.5344555169949383'],
        [1704507617.66, '-0.5344555169949383'],
        [1704509633.66, '-0.5344555169949383'],
        [1704511649.66, '-0.5344555169949383'],
        [1704513665.66, '-0.5344555169949383'],
        [1704515681.66, '-0.5344555169949383'],
        [1704517697.66, '-0.5344555169949383'],
        [1704519713.66, '-0.5344555169949383'],
        [1704521729.66, '-0.5344555169949383'],
        [1704523745.66, '-0.5344555169949383'],
        [1704525761.66, '-0.5344555169949383'],
        [1704527777.66, '-0.5344555169949383'],
        [1704529793.66, '-0.5344555169949383'],
        [1704531809.66, '-0.5344555169949383'],
        [1704533825.66, '-0.5344555169949383'],
        [1704535841.66, '-0.5344555169949383'],
        [1704537857.66, '-0.5344555169949383'],
        [1704539873.66, '-0.5344555169949383'],
        [1704541889.66, '-0.5344555169949383'],
        [1704543905.66, '-0.5344555169949383'],
        [1704545921.66, '-0.5344555169949383'],
        [1704547937.66, '-0.5344555169949383'],
        [1704549953.66, '-0.5344555169949383'],
        [1704551969.66, '-0.5344555169949383'],
        [1704553985.66, '-0.5344555169949383'],
        [1704556001.66, '-0.5344555169949383'],
        [1704558017.66, '-0.5344555169949383'],
        [1704560033.66, '-0.5344555169949383'],
        [1704562049.66, '-0.5344555169949383'],
      ],
    },
    {
      metric: {
        pod: 'trustyai-service-5647b69dbb-vnjpr',
        request: '1580303a-b85b-4c58-9d09-95c3979eb1bd',
      },
      values: [
        [1704803969.66, '-0.43448196434329944'],
        [1704805985.66, '-0.43448196434329944'],
        [1704808001.66, '-0.43448196434329944'],
        [1704810017.66, '-0.43448196434329944'],
        [1704812033.66, '-0.4658163173817593'],
        [1704814049.66, '-0.4658163173817593'],
        [1704816065.66, '-0.4658163173817593'],
        [1704818081.66, '-0.4658163173817593'],
        [1704820097.66, '-0.5252423852423852'],
        [1704822113.66, '-0.5621825564784931'],
        [1704824129.66, '-0.5621825564784931'],
        [1704826145.66, '-0.5621825564784931'],
        [1704828161.66, '-0.5578651747983261'],
        [1704830177.66, '-0.5737560989397297'],
        [1704832193.66, '-0.5439754929914697'],
        [1704834209.66, '-0.5399727427456406'],
        [1704836225.66, '-0.5628424370510811'],
        [1704838241.66, '-0.5344555169949383'],
        [1704840257.66, '-0.5638751646903821'],
        [1704842273.66, '-0.5556285905846162'],
        [1704844289.66, '-0.5656022783946243'],
        [1704846305.66, '-0.5459968388495934'],
        [1704848321.66, '-0.5475887748615021'],
        [1704850337.66, '-0.5407448677221389'],
        [1704852353.66, '-0.5645916683272785'],
        [1704854369.66, '-0.5274765894745792'],
        [1704856385.66, '-0.5621825564784931'],
        [1704858401.66, '-0.5459536727641675'],
        [1704860417.66, '-0.5672082091879674'],
        [1704862433.66, '-0.5365205179940247'],
        [1704864449.66, '-0.5244753675232858'],
        [1704866465.66, '-0.5638751646903821'],
        [1704868481.66, '-0.5468889525055257'],
        [1704870497.66, '-0.5065217642591135'],
        [1704872513.66, '-0.5576174257139501'],
        [1704874529.66, '-0.5176435218340137'],
        [1704876545.66, '-0.4997025324862196'],
        [1704878561.66, '-0.5408728632057896'],
        [1704880577.66, '-0.5268220698535122'],
        [1704882593.66, '-0.5374113898141358'],
        [1704884609.66, '-0.5468889525055257'],
        [1704886625.66, '-0.5517937496116856'],
        [1704888641.66, '-0.5438993508178912'],
        [1704890657.66, '-0.5268220698535122'],
        [1704892673.66, '-0.5438993508178912'],
        [1704894689.66, '-0.5578651747983261'],
        [1704896705.66, '-0.5244487329815647'],
        [1704898721.66, '-0.5421568004765732'],
        [1704900737.66, '-0.5706606760470525'],
        [1704902753.66, '-0.5556285905846162'],
        [1704904769.66, '-0.5475887748615021'],
        [1704906785.66, '-0.513155940351672'],
        [1704908801.66, '-0.4930609226302921'],
        [1704910817.66, '-0.5407803978789179'],
        [1704912833.66, '-0.5407803978789179'],
        [1704914849.66, '-0.5407803978789179'],
        [1704916865.66, '-0.5407803978789179'],
        [1704918881.66, '-0.5407803978789179'],
        [1704920897.66, '-0.5407803978789179'],
        [1704922913.66, '-0.5407803978789179'],
        [1704924929.66, '-0.5407803978789179'],
        [1704926945.66, '-0.5407803978789179'],
        [1704928961.66, '-0.5407803978789179'],
        [1704930977.66, '-0.5407803978789179'],
        [1704932993.66, '-0.5407803978789179'],
        [1704935009.66, '-0.5407803978789179'],
        [1704937025.66, '-0.5407803978789179'],
        [1704939041.66, '-0.5407803978789179'],
        [1704941057.66, '-0.5407803978789179'],
        [1704943073.66, '-0.5407803978789179'],
        [1704945089.66, '-0.5407803978789179'],
        [1704947105.66, '-0.5407803978789179'],
        [1704949121.66, '-0.5407803978789179'],
        [1704951137.66, '-0.5407803978789179'],
        [1704953153.66, '-0.5407803978789179'],
        [1704955169.66, '-0.5407803978789179'],
        [1704957185.66, '-0.5407803978789179'],
        [1704959201.66, '-0.5407803978789179'],
        [1704961217.66, '-0.5407803978789179'],
        [1704963233.66, '-0.5407803978789179'],
        [1704965249.66, '-0.5407803978789179'],
        [1704967265.66, '-0.5407803978789179'],
        [1704969281.66, '-0.5438993508178912'],
        [1704971297.66, '-0.5542233215173801'],
        [1704973313.66, '-0.5638751646903821'],
        [1704975329.66, '-0.5649205716716129'],
        [1704977345.66, '-0.5628424370510811'],
        [1704979361.66, '-0.5459968388495934'],
        [1704981377.66, '-0.5532300263694537'],
        [1704983393.66, '-0.5466905402223193'],
        [1704985409.66, '-0.5475887748615021'],
        [1704987425.66, '-0.5344555169949383'],
      ],
    },
  ];

  const DIRResult: PrometheusQueryRangeResponseDataResult[] = [
    {
      metric: {
        pod: 'trustyai-service-b46c5dc9-nkpvz',
        request: '1e9e3d3f-49aa-4341-acf0-e9409ee2b1e7',
      },
      values: [
        [1704382625.66, '0.17839610978323578'],
        [1704384641.66, '0.17839610978323578'],
        [1704386657.66, '0.17839610978323578'],
        [1704388673.66, '0.17839610978323578'],
        [1704390689.66, '0.17839610978323578'],
        [1704392705.66, '0.17839610978323578'],
        [1704394721.66, '0.17839610978323578'],
        [1704396737.66, '0.17839610978323578'],
        [1704398753.66, '0.17839610978323578'],
        [1704400769.66, '0.17839610978323578'],
        [1704402785.66, '0.17839610978323578'],
        [1704404801.66, '0.17839610978323578'],
        [1704406817.66, '0.17839610978323578'],
        [1704408833.66, '0.17839610978323578'],
        [1704410849.66, '0.17839610978323578'],
        [1704412865.66, '0.17839610978323578'],
        [1704414881.66, '0.17839610978323578'],
        [1704416897.66, '0.17839610978323578'],
        [1704418913.66, '0.17839610978323578'],
        [1704420929.66, '0.17839610978323578'],
        [1704422945.66, '0.17839610978323578'],
        [1704424961.66, '0.17839610978323578'],
        [1704426977.66, '0.17839610978323578'],
        [1704428993.66, '0.17839610978323578'],
        [1704431009.66, '0.17839610978323578'],
        [1704433025.66, '0.17839610978323578'],
        [1704435041.66, '0.17839610978323578'],
        [1704437057.66, '0.17839610978323578'],
        [1704439073.66, '0.17839610978323578'],
        [1704441089.66, '0.17839610978323578'],
        [1704443105.66, '0.17839610978323578'],
        [1704445121.66, '0.17839610978323578'],
        [1704447137.66, '0.17839610978323578'],
        [1704449153.66, '0.17839610978323578'],
        [1704451169.66, '0.17839610978323578'],
        [1704453185.66, '0.17839610978323578'],
        [1704455201.66, '0.17839610978323578'],
        [1704457217.66, '0.17839610978323578'],
        [1704459233.66, '0.17839610978323578'],
        [1704461249.66, '0.17839610978323578'],
        [1704463265.66, '0.17839610978323578'],
        [1704465281.66, '0.17839610978323578'],
        [1704467297.66, '0.17839610978323578'],
        [1704469313.66, '0.17839610978323578'],
        [1704471329.66, '0.17839610978323578'],
        [1704473345.66, '0.17839610978323578'],
        [1704475361.66, '0.17839610978323578'],
        [1704477377.66, '0.17839610978323578'],
        [1704479393.66, '0.17839610978323578'],
        [1704481409.66, '0.17839610978323578'],
        [1704483425.66, '0.17839610978323578'],
        [1704485441.66, '0.17839610978323578'],
        [1704487457.66, '0.17839610978323578'],
        [1704489473.66, '0.17839610978323578'],
        [1704491489.66, '0.17839610978323578'],
        [1704493505.66, '0.17839610978323578'],
        [1704495521.66, '0.17839610978323578'],
        [1704497537.66, '0.17839610978323578'],
        [1704499553.66, '0.17839610978323578'],
        [1704501569.66, '0.17839610978323578'],
        [1704503585.66, '0.17839610978323578'],
        [1704505601.66, '0.17839610978323578'],
        [1704507617.66, '0.17839610978323578'],
        [1704509633.66, '0.17839610978323578'],
        [1704511649.66, '0.17839610978323578'],
        [1704513665.66, '0.17839610978323578'],
        [1704515681.66, '0.17839610978323578'],
        [1704517697.66, '0.17839610978323578'],
        [1704519713.66, '0.17839610978323578'],
        [1704521729.66, '0.17839610978323578'],
        [1704523745.66, '0.17839610978323578'],
        [1704525761.66, '0.17839610978323578'],
        [1704527777.66, '0.17839610978323578'],
        [1704529793.66, '0.17839610978323578'],
        [1704531809.66, '0.17839610978323578'],
        [1704533825.66, '0.17839610978323578'],
        [1704535841.66, '0.17839610978323578'],
        [1704537857.66, '0.17839610978323578'],
        [1704539873.66, '0.17839610978323578'],
        [1704541889.66, '0.17839610978323578'],
        [1704543905.66, '0.17839610978323578'],
        [1704545921.66, '0.17839610978323578'],
        [1704547937.66, '0.17839610978323578'],
        [1704549953.66, '0.17839610978323578'],
        [1704551969.66, '0.17839610978323578'],
        [1704553985.66, '0.17839610978323578'],
        [1704556001.66, '0.17839610978323578'],
        [1704558017.66, '0.17839610978323578'],
        [1704560033.66, '0.17839610978323578'],
        [1704562049.66, '0.17839610978323578'],
      ],
    },
    {
      metric: {
        pod: 'trustyai-service-5647b69dbb-vnjpr',
        request: 'c00135c3-61f8-4368-a365-8da89edf27bc',
      },
      values: [
        [1704812033.66, '0.2989498492357814'],
        [1704814049.66, '0.2989498492357814'],
        [1704816065.66, '0.2989498492357814'],
        [1704818081.66, '0.2989498492357814'],
        [1704820097.66, '0.24914808452015386'],
        [1704822113.66, '0.22250914513416628'],
        [1704824129.66, '0.22250914513416628'],
        [1704826145.66, '0.22250914513416628'],
        [1704828161.66, '0.21473618898858934'],
        [1704830177.66, '0.17958000193847223'],
        [1704832193.66, '0.1649233535052527'],
        [1704834209.66, '0.16691266944181518'],
        [1704836225.66, '0.14906476860688853'],
        [1704838241.66, '0.16133581095982172'],
        [1704840257.66, '0.1589819893655132'],
        [1704842273.66, '0.16388178608137133'],
        [1704844289.66, '0.16079432759193774'],
        [1704846305.66, '0.1600902740906025'],
        [1704848321.66, '0.16346354832619503'],
        [1704850337.66, '0.1638052392427195'],
        [1704852353.66, '0.1657444195779253'],
        [1704854369.66, '0.1672590514942827'],
        [1704856385.66, '0.1597383462552112'],
        [1704858401.66, '0.15928107622946802'],
        [1704860417.66, '0.1535164613493569'],
        [1704862433.66, '0.16137643572246965'],
        [1704864449.66, '0.16271206548648823'],
        [1704866465.66, '0.16732693493256873'],
        [1704868481.66, '0.16443705641403158'],
        [1704870497.66, '0.17056172599318112'],
        [1704872513.66, '0.17109421220440357'],
        [1704874529.66, '0.17232566904295435'],
        [1704876545.66, '0.16911049045202367'],
        [1704878561.66, '0.1736356281142876'],
        [1704880577.66, '0.16737376472269044'],
        [1704882593.66, '0.176683378402754'],
        [1704884609.66, '0.1729225351268036'],
        [1704886625.66, '0.16337800102176317'],
        [1704888641.66, '0.16096759669814764'],
        [1704890657.66, '0.16129244041618596'],
        [1704892673.66, '0.16370496111994418'],
        [1704894689.66, '0.16308264920154594'],
        [1704896705.66, '0.16737103770290923'],
        [1704898721.66, '0.17265747978292667'],
        [1704900737.66, '0.16603499904341276'],
        [1704902753.66, '0.16106705181448014'],
        [1704904769.66, '0.1588440508378954'],
        [1704906785.66, '0.15841346059079314'],
        [1704908801.66, '0.16640396745567082'],
        [1704910817.66, '0.16559041948195904'],
        [1704912833.66, '0.16559041948195904'],
        [1704914849.66, '0.16559041948195904'],
        [1704916865.66, '0.16559041948195904'],
        [1704918881.66, '0.16559041948195904'],
        [1704920897.66, '0.16559041948195904'],
        [1704922913.66, '0.16559041948195904'],
        [1704924929.66, '0.16559041948195904'],
        [1704926945.66, '0.16559041948195904'],
        [1704928961.66, '0.16559041948195904'],
        [1704930977.66, '0.16559041948195904'],
        [1704932993.66, '0.16559041948195904'],
        [1704935009.66, '0.16559041948195904'],
        [1704937025.66, '0.16559041948195904'],
        [1704939041.66, '0.16559041948195904'],
        [1704941057.66, '0.16559041948195904'],
        [1704943073.66, '0.16559041948195904'],
        [1704945089.66, '0.16559041948195904'],
        [1704947105.66, '0.16559041948195904'],
        [1704949121.66, '0.16559041948195904'],
        [1704951137.66, '0.16559041948195904'],
        [1704953153.66, '0.16559041948195904'],
        [1704955169.66, '0.16559041948195904'],
        [1704957185.66, '0.16559041948195904'],
        [1704959201.66, '0.16559041948195904'],
        [1704961217.66, '0.16559041948195904'],
        [1704963233.66, '0.16559041948195904'],
        [1704965249.66, '0.16559041948195904'],
        [1704967265.66, '0.16559041948195904'],
        [1704969281.66, '0.1697569600488517'],
        [1704971297.66, '0.16681672091029892'],
        [1704973313.66, '0.1620989302332829'],
        [1704975329.66, '0.16768856501554535'],
        [1704977345.66, '0.1564264163415223'],
        [1704979361.66, '0.16345069955573238'],
        [1704981377.66, '0.16014200985762722'],
        [1704983393.66, '0.15883556342697647'],
        [1704985409.66, '0.15724129527796715'],
        [1704987425.66, '0.15093277424204818'],
      ],
    },
    {
      metric: {
        pod: 'trustyai-service-5647b69dbb-vnjpr',
        request: 'f00fcf0c-fe64-4e08-a35f-7f483aa5dc6d',
      },
      values: [
        [1704820097.66, '0.24914808452015386'],
        [1704822113.66, '0.22250914513416628'],
        [1704824129.66, '0.22250914513416628'],
        [1704826145.66, '0.22250914513416628'],
        [1704828161.66, '0.21473618898858934'],
        [1704830177.66, '0.17958000193847223'],
        [1704832193.66, '0.1649233535052527'],
        [1704834209.66, '0.16691266944181518'],
        [1704836225.66, '0.14906476860688853'],
        [1704838241.66, '0.16133581095982172'],
        [1704840257.66, '0.1589819893655132'],
        [1704842273.66, '0.16388178608137133'],
        [1704844289.66, '0.16079432759193774'],
        [1704846305.66, '0.1600902740906025'],
        [1704848321.66, '0.16346354832619503'],
        [1704850337.66, '0.1638052392427195'],
        [1704852353.66, '0.1657444195779253'],
        [1704854369.66, '0.1672590514942827'],
        [1704856385.66, '0.1597383462552112'],
        [1704858401.66, '0.15928107622946802'],
        [1704860417.66, '0.1535164613493569'],
        [1704862433.66, '0.16137643572246965'],
        [1704864449.66, '0.16271206548648823'],
        [1704866465.66, '0.16732693493256873'],
        [1704868481.66, '0.16443705641403158'],
        [1704870497.66, '0.17056172599318112'],
        [1704872513.66, '0.17109421220440357'],
        [1704874529.66, '0.17232566904295435'],
        [1704876545.66, '0.16911049045202367'],
        [1704878561.66, '0.1736356281142876'],
        [1704880577.66, '0.16737376472269044'],
        [1704882593.66, '0.176683378402754'],
        [1704884609.66, '0.1729225351268036'],
        [1704886625.66, '0.16337800102176317'],
        [1704888641.66, '0.16096759669814764'],
        [1704890657.66, '0.16129244041618596'],
        [1704892673.66, '0.16370496111994418'],
        [1704894689.66, '0.16308264920154594'],
        [1704896705.66, '0.16737103770290923'],
        [1704898721.66, '0.17265747978292667'],
        [1704900737.66, '0.16603499904341276'],
        [1704902753.66, '0.16106705181448014'],
        [1704904769.66, '0.1588440508378954'],
        [1704906785.66, '0.15841346059079314'],
        [1704908801.66, '0.16640396745567082'],
        [1704910817.66, '0.16559041948195904'],
        [1704912833.66, '0.16559041948195904'],
        [1704914849.66, '0.16559041948195904'],
        [1704916865.66, '0.16559041948195904'],
        [1704918881.66, '0.16559041948195904'],
        [1704920897.66, '0.16559041948195904'],
        [1704922913.66, '0.16559041948195904'],
        [1704924929.66, '0.16559041948195904'],
        [1704926945.66, '0.16559041948195904'],
        [1704928961.66, '0.16559041948195904'],
        [1704930977.66, '0.16559041948195904'],
        [1704932993.66, '0.16559041948195904'],
        [1704935009.66, '0.16559041948195904'],
        [1704937025.66, '0.16559041948195904'],
        [1704939041.66, '0.16559041948195904'],
        [1704941057.66, '0.16559041948195904'],
        [1704943073.66, '0.16559041948195904'],
        [1704945089.66, '0.16559041948195904'],
        [1704947105.66, '0.16559041948195904'],
        [1704949121.66, '0.16559041948195904'],
        [1704951137.66, '0.16559041948195904'],
        [1704953153.66, '0.16559041948195904'],
        [1704955169.66, '0.16559041948195904'],
        [1704957185.66, '0.16559041948195904'],
        [1704959201.66, '0.16559041948195904'],
        [1704961217.66, '0.16559041948195904'],
        [1704963233.66, '0.16559041948195904'],
        [1704965249.66, '0.16559041948195904'],
        [1704967265.66, '0.16559041948195904'],
        [1704969281.66, '0.1697569600488517'],
        [1704971297.66, '0.16681672091029892'],
        [1704973313.66, '0.1620989302332829'],
        [1704975329.66, '0.16768856501554535'],
        [1704977345.66, '0.1564264163415223'],
        [1704979361.66, '0.16345069955573238'],
        [1704981377.66, '0.16014200985762722'],
        [1704983393.66, '0.15883556342697647'],
        [1704985409.66, '0.15724129527796715'],
        [1704987425.66, '0.15093277424204818'],
      ],
    },
  ];

  return {
    code: 200,
    response: {
      status: 'success',
      data: {
        resultType: 'matrix',
        result: result ?? (metric === 'SPD' ? SPDResult : DIRResult),
      },
    },
  };
};