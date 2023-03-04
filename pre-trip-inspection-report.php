<?php

/**
 * Template Name: CE Spray Foam | Pre-Trip Inspection Report
 * Version: 1
 * Description: A custom PDF template for CE Spray Foam's Pre-Trip Inspection Report form
 * Author: Jayden Tucker
 * Author URI: https://ninjabattler.ca
 * Group: Custom
 * Required PDF Version: 4.0
 */

/* Prevent direct access to the template (always good to include this) */
if (!class_exists('GFForms')) {
  return;
}

/**
 * All Gravity PDF v4/v5/v6 templates have access to the following variables:
 *
 * @var array  $form      The current Gravity Forms array
 * @var array  $entry     The raw entry data
 * @var array  $form_data The processed entry data stored in an array
 * @var object $settings  The current PDF configuration
 * @var array  $fields    An array of Gravity Forms fields which can be accessed with their ID number
 * @var array  $config    The initialised template config class – eg. /config/zadani.php
 */

$name = $form_data['field'][1];
$address = implode(' ', $form_data['field'][3]);
$vehicleLoad = $form_data['list'][4];

$preTrip = $form_data['field'][5];
$preTimeOfInspection = $form_data['field'][11];
$preDate = $form_data['field'][8];
$locationOfInspection = $form_data['field'][9];

$postTrip = $form_data['field'][12];
$postTimeOfInspection = $form_data['field'][13];
$postDate = $form_data['field'][14];
$odometerReading = $form_data['field'][15];

$truckNumber = $form_data['field'][16];
$trailerNumber = $form_data['field'][17];

$inspectorName = $form_data['field'][18];
$inspectorSignature = $form_data['field'][19];
$driverSignature = $form_data['field'][20];
$noDefects = $form_data['field'][21];

$remarks = $form_data['field'][77];
$defects = $form_data['field'][78];

// 
// Main Table
//

$ab1 = $form_data['field'][48];
$ab2 = $form_data['field'][23];
$ab3 = $form_data['field'][49];

$cab1 = $form_data['field'][24];

$cargo1 = $form_data['field'][45];
$cargo2 = $form_data['field'][50];
$cargo3 = $form_data['field'][51];

$coupling1 = $form_data['field'][44];
$coupling2 = $form_data['field'][52];
$coupling3 = $form_data['field'][53];

$danger1 = $form_data['field'][43];
$danger2 = $form_data['field'][54];
$danger3 = $form_data['field'][55];

$dc1 = $form_data['field'][42];

$ds1 = $form_data['field'][41];

$electric1 = $form_data['field'][40];
$electric2 = $form_data['field'][56];
$electric3 = $form_data['field'][57];

$emergency1 = $form_data['field'][39];
$emergency2 = $form_data['field'][58];
$emergency3 = $form_data['field'][59];

$exaust1 = $form_data['field'][38];

$frame1 = $form_data['field'][37];
$frame2 = $form_data['field'][60];
$frame3 = $form_data['field'][61];

$fuel1 = $form_data['field'][46];
$fuel2 = $form_data['field'][62];
$fuel3 = $form_data['field'][63];

$gDefects1 = $form_data['field'][36];
$gDefects2 = $form_data['field'][64];
$gDefects3 = $form_data['field'][65];

$glass1 = $form_data['field'][35];

$heater1 = $form_data['field'][34];

$horn1 = $form_data['field'][33];

$hydraulic1 = $form_data['field'][32];
$hydraulic2 = $form_data['field'][66];
$hydraulic3 = $form_data['field'][67];

$lamp1 = $form_data['field'][31];
$lamp2 = $form_data['field'][68];
$lamp3 = $form_data['field'][69];

$steering1 = $form_data['field'][30];

$suspension1 = $form_data['field'][29];
$suspension2 = $form_data['field'][70];
$suspension3 = $form_data['field'][71];

$tires1 = $form_data['field'][47];
$tires2 = $form_data['field'][72];
$tires3 = $form_data['field'][75];

$hubs1 = $form_data['field'][28];
$hubs2 = $form_data['field'][73];
$hubs3 = $form_data['field'][74];

$windshield1 = $form_data['field'][27];

// 
// Main Table End
//

$repairerSig = $form_data['field'][79];
$repairerSigDate = $form_data['field'][81];
$driverSig = $form_data['field'][80];
$driverSigDate = $form_data['field'][82];

?>


<style>
  main {
    width: 100%;
  }

  td {
    font-weight: 100;
    margin: 0;
    margin-bottom: 10px;
    font-size: 9pt;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .trailerCell {
    width: 65%;
  }

  .notTrailerCell {
    width: 7.5%;
  }

  span {
    width: 100%;
    display: inline;
    margin: 0;
    padding: 0;
    text-decoration: underline;
  }

  tr {
    margin: 0;
    background-color: white;
  }

  b {
    font-weight: 900;
  }

  #mainTable {
    width: 92.5%;
    margin-bottom: 20px;
    margin-left: 1.875%;
  }

  .borderRow {
    border: 1px solid black;
    text-align: center;
  }

  #measureTable {
    width: 100%;
    margin-top: 30px;
    font-size: 10pt;
  }

  h1 {
    margin: 0;
    font-size: 16pt;
    text-align: center;
  }

  .walkAroundRow {
    margin-bottom: 10px;
  }

  .checkBox {
    width: 50px;
    margin-left: 50px;
  }

  img {
    margin-left: auto;
    margin-right: auto;
    width: 20%;
  }

  .vHeight {
    text-align: right;
  }

  .halfFontSize {
    font-size: 5pt;
  }

  .overline {
    text-decoration: overline;
    padding-top: 0;
  }

  h5 {
    text-align: center;
  }

  .invertedCell {
    background-color: black;
    color: white;
  }
</style>

<main>
  <img src="https://cefoam.ca/web/wp-content/uploads/2021/03/cesprayfoam-logo-purple.png" />
  <h1>Driver's Vehicle Inspection Report</h1>

  <table>
    <tbody>
      <tr>
        <td>
          Company Name<br>& Address: <span><?php echo esc_html($name) ?>, <?php echo esc_html($address) ?></span>
        </td>
        <td>

          <!-- <table>
            <tr>
              <th>Vehicle/Load<br>
                <p class="halfFontSize">(MB Reg. 95/2008)</p>
              </th>
              <th>Height</th>
              <th></th>
              <th>Width</th>
            </tr>
            <?php
            if (is_array($vehicleLoad)) {
              foreach ($vehicleLoad as $row) {
                echo "<tr><td></td><td class='vHeight'><span>" . esc_html($row['Height'] ?? '') . "</span></td><td>/</td><td><span>" . esc_html($row['Width'] ?? '') . "</span></td></tr>";
              }
            }
            ?>
          </table> -->

        </td>
      </tr>
    </tbody>
  </table>

  <table>
    <tr>
      <td>
        <span><?php echo esc_html($preTrip) ?></span> Pre-trip
      </td>
      <td>
        Time of Inspection: <span><?php echo esc_html($preTimeOfInspection) ?></span>
      </td>
      <td>
        Date: <span><?php echo esc_html($preDate) ?></span>
      </td>
      <td>
        Location of Inspection: <span><?php echo esc_html($locationOfInspection) ?></span>
      </td>
    </tr>
    <tr>
      <td>
        <span><?php echo esc_html($postTrip) ?></span> Post-trip
      </td>
      <td>
        Time of Inspection: <span><?php echo esc_html($postTimeOfInspection) ?></span>
      </td>
      <td>
        Date: <span><?php echo esc_html($postDate) ?></span>
      </td>
      <td>
        Odometer Reading (if equipped): <span><?php echo esc_html($odometerReading) ?></span>
      </td>
    </tr>
  </table>

  <table>
    <tr>
      <td>
        Tractor/Truck Plate or Unit No.: <span><?php echo esc_html($truckNumber) ?></span>
      </td>
      <td>
        Trailer(s) Plate or Unit No.: <span><?php echo esc_html($trailerNumber) ?></span>
      </td>
    </tr>
  </table>

  <h5><em>I declare that the vehicle(s) shown above has (have) been inspected in accordance with the applicable requirements</em></h5>

  <table>
    <tr>
      <td>
        <?php echo esc_html($inspectorName) ?>
      </td>
      <td>
        <?php echo esc_html($inspectorSignature) ?>
      </td>
      <td>
        <?php echo esc_html($driverSignature) ?>
      </td>
    </tr>
    <tr>
      <td class="overline">
        Inspector / Driver's Name Print
      </td>
      <td class="overline">
        Inspector / Driver's Signature
      </td>
      <td class="overline">
        Driver's Signature (If Different From Inspector)
      </td>
    </tr>
  </table>

  <span><?php echo esc_html(in_array('No Defects Found', $noDefects) ? '✓' : '⨉') ?></span> No Defects Found

  <h5>If Item is Defected Use X Under the D Column / When Repaired Use ✓ Under the R Column.</h5>



  <table id="mainTable">
    <tr>
      <th class="invertedCell" colspan="2">Tractor/Truck</th>
      <th class="invertedCell trailerCell">Trailer #</th>
      <th class="invertedCell">1</th>
      <th class="invertedCell">1</th>
      <th class="invertedCell">2</th>
      <th class="invertedCell">2</th>
    </tr>
    <tr>
      <th class="borderRow notTrailerCell">D</th>
      <th class="borderRow notTrailerCell">R</th>
      <th class="borderRow trailerCell">D/Defect R/Repaired</th>
      <th class="borderRow notTrailerCell">D</th>
      <th class="borderRow notTrailerCell">R</th>
      <th class="borderRow notTrailerCell">D</th>
      <th class="borderRow notTrailerCell">R</th>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $ab1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $ab1) ? '✓' : '') ?></td>
      <td class="borderRow">1. Air Brake System</td>
      <td class="borderRow"><?php echo (in_array('D', $ab2) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $ab2) ? '✓' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('D', $ab3) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $ab3) ? '✓' : '') ?></td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $cab1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $cab1) ? '✓' : '') ?></td>
      <td class="borderRow">2. Cab</td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $cargo1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $cargo1) ? '✓' : '') ?></td>
      <td class="borderRow">3. Cargo Securement</td>
      <td class="borderRow"><?php echo (in_array('D', $cargo2) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $cargo2) ? '✓' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('D', $cargo3) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $cargo3) ? '✓' : '') ?></td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $coupling1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $coupling1) ? '✓' : '') ?></td>
      <td class="borderRow">4. Coupling Devices</td>
      <td class="borderRow"><?php echo (in_array('D', $coupling2) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $coupling2) ? '✓' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('D', $coupling3) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $coupling3) ? '✓' : '') ?></td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $danger1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $danger1) ? '✓' : '') ?></td>
      <td class="borderRow">5. Dangerous Goods (if any)</td>
      <td class="borderRow"><?php echo (in_array('D', $danger2) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $danger2) ? '✓' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('D', $danger3) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $danger3) ? '✓' : '') ?></td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $dc1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $dc1) ? '✓' : '') ?></td>
      <td class="borderRow">6. Driver Controls</td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $ds1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $ds1) ? '✓' : '') ?></td>
      <td class="borderRow">7. Driver Seat</td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $electric1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $electric1) ? '✓' : '') ?></td>
      <td class="borderRow">8. Electric Brake System</td>
      <td class="borderRow"><?php echo (in_array('D', $electric2) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $electric2) ? '✓' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('D', $electric3) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $electric3) ? '✓' : '') ?></td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $emergency1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $emergency1) ? '✓' : '') ?></td>
      <td class="borderRow">9. Emergency Equipment &<br>Safety Devices</td>
      <td class="borderRow"><?php echo (in_array('D', $emergency2) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $emergency2) ? '✓' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('D', $emergency3) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $emergency3) ? '✓' : '') ?></td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $exaust1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $exaust1) ? '✓' : '') ?></td>
      <td class="borderRow">10. Exaust System</td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $frame1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $frame1) ? '✓' : '') ?></td>
      <td class="borderRow">11. Frame and Cargo Body</td>
      <td class="borderRow"><?php echo (in_array('D', $frame2) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $frame2) ? '✓' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('D', $frame3) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $frame3) ? '✓' : '') ?></td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $fuel1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $fuel1) ? '✓' : '') ?></td>
      <td class="borderRow">12. Fuel System</td>
      <td class="borderRow"><?php echo (in_array('D', $fuel2) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $fuel2) ? '✓' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('D', $fuel3) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $fuel3) ? '✓' : '') ?></td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $gDefects1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $gDefects1) ? '✓' : '') ?></td>
      <td class="borderRow">13. General Defects</td>
      <td class="borderRow"><?php echo (in_array('D', $gDefects2) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $gDefects2) ? '✓' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('D', $gDefects3) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $gDefects3) ? '✓' : '') ?></td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $glass1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $glass1) ? '✓' : '') ?></td>
      <td class="borderRow">14. Glass and Mirrors</td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $heater1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $heater1) ? '✓' : '') ?></td>
      <td class="borderRow">15. Heater / Defroster</td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $horn1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $horn1) ? '✓' : '') ?></td>
      <td class="borderRow">16. Horn</td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $hydraulic1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $hydraulic1) ? '✓' : '') ?></td>
      <td class="borderRow">17. Hydraulic Brake System</td>
      <td class="borderRow"><?php echo (in_array('D', $hydraulic2) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $hydraulic2) ? '✓' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('D', $hydraulic3) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $hydraulic3) ? '✓' : '') ?></td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $lamp1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $lamp1) ? '✓' : '') ?></td>
      <td class="borderRow">18. Lamps and Reflectors</td>
      <td class="borderRow"><?php echo (in_array('D', $lamp2) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $lamp2) ? '✓' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('D', $lamp3) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $lamp3) ? '✓' : '') ?></td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $steering1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $steering1) ? '✓' : '') ?></td>
      <td class="borderRow">19. Steering</td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $suspension1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $suspension1) ? '✓' : '') ?></td>
      <td class="borderRow">20. Suspension System</td>
      <td class="borderRow"><?php echo (in_array('D', $suspension2) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $suspension2) ? '✓' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('D', $suspension3) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $suspension3) ? '✓' : '') ?></td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $tires1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $tires1) ? '✓' : '') ?></td>
      <td class="borderRow">21. Tires</td>
      <td class="borderRow"><?php echo (in_array('D', $tires2) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $tires2) ? '✓' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('D', $tires3) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $tires3) ? '✓' : '') ?></td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $hubs1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $hubs1) ? '✓' : '') ?></td>
      <td class="borderRow">22. Wheels / Hubs / Fasteners</td>
      <td class="borderRow"><?php echo (in_array('D', $hubs2) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $hubs2) ? '✓' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('D', $hubs3) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $hubs3) ? '✓' : '') ?></td>
    </tr>

    <tr>
      <td class="borderRow"><?php echo (in_array('D', $windshield1) ? 'x' : '') ?></td>
      <td class="borderRow"><?php echo (in_array('R', $windshield1) ? '✓' : '') ?></td>
      <td class="borderRow">23. Windshield Wipers &<br>Washers</td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
      <td class="borderRow invertedCell"> </td>
    </tr>
  </table>

  <p>Remarks:</p><p class="borderRow" style="text-align: left"><?php echo $remarks ?></p>

  <table>
    <tr>
      <td>
        <span><?php echo esc_html(in_array('Above defects corrected', $defects) ? '✓' : '⨉') ?></span> Above defects corrected
      </td>
      <td>
        <span><?php echo esc_html(in_array('Above defects need not be corrected for safe operation of vehicle', $defects) ? '✓' : '⨉') ?></span> Above defects need not be corrected for safe operation of vehicle
      </td>
    </tr>
  </table>

  <table>
    <tr>
      <td>
        Authorized Repairer's Signature: <span><?php echo esc_html($repairerSig) ?></span>
      </td>
      <td>
        Date: <span><?php echo esc_html($repairerSigDate) ?></span>
      </td>
      <td>
        Driver's Signature: <span><?php echo esc_html($driverSig) ?></span>
      </td>
      <td>
        Date: <span><?php echo esc_html($driverSigDate) ?></span>
      </td>
    </tr>
  </table>
</main>